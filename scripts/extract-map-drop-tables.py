#!/usr/bin/env python3
import hashlib
import json
import struct
import sys
import urllib.request
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

try:
    import mpyq
except ImportError:
    print("Install mpyq first: python3 -m pip install --target .codex_deps mpyq", file=sys.stderr)
    raise

ROOT = Path(__file__).resolve().parents[1]
ANALYSIS_FILE = ROOT / "public" / "replay-analysis.json"
OUTPUT_FILE = ROOT / "public" / "map-drop-tables.json"
MAP_DIR = ROOT / "data" / "maps"

# WC3Maps search is fuzzy; keep verified archive ids here after matching SHA1.
WC3MAPS_IDS_BY_SHA1 = {
    "3e2f4a66f39466bbaa339ea6c019fc2b30752aea": 406125,
    "7b89059994f918b9b0632333fc84c60d1913eb7f": 405836,
}


class Reader:
    def __init__(self, data):
        self.data = data
        self.offset = 0

    def raw(self, size):
        value = self.data[self.offset : self.offset + size]
        self.offset += size
        return value

    def int(self):
        return struct.unpack_from("<i", self.raw(4))[0]

    def byte(self):
        return struct.unpack_from("<B", self.raw(1))[0]

    def float(self):
        return struct.unpack_from("<f", self.raw(4))[0]

    def id(self):
        return self.raw(4).decode("latin1")


def replay_maps():
    analysis = json.loads(ANALYSIS_FILE.read_text())
    maps = {}
    for replays in analysis["players"].values():
        for replay in replays.values():
            map_data = replay.get("map") or {}
            sha1 = map_data.get("checksumSha1")
            if sha1:
                maps.setdefault(sha1, map_data.get("file") or f"{sha1}.w3x")
    return maps


def download_map(sha1, file_name, wc3maps_id):
    MAP_DIR.mkdir(parents=True, exist_ok=True)
    path = MAP_DIR / file_name
    if not path.exists():
        url = f"https://wc3maps.com/api/download/{wc3maps_id}"
        request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        path.write_bytes(urllib.request.urlopen(request).read())

    actual_sha1 = hashlib.sha1(path.read_bytes()).hexdigest()
    if actual_sha1 != sha1:
        raise RuntimeError(f"{file_name} SHA1 mismatch: expected {sha1}, got {actual_sha1}")
    return path


def parse_units_doo(archive_path):
    archive = mpyq.MPQArchive(str(archive_path))
    data = archive.read_file("war3mapUnits.doo")
    if not data:
        raise RuntimeError(f"{archive_path} does not contain war3mapUnits.doo")

    reader = Reader(data)
    if reader.raw(4) != b"W3do":
        raise RuntimeError(f"{archive_path} has an unsupported war3mapUnits.doo header")

    version = reader.int()
    reader.int()
    unit_count = reader.int()
    drop_groups = Counter()

    for _ in range(unit_count):
        reader.id()
        reader.int()
        for _ in range(7):
            reader.float()
        reader.id()
        reader.byte()
        reader.int()
        reader.byte()
        reader.byte()
        reader.int()
        reader.int()
        reader.int()
        item_set_count = reader.int()

        for _ in range(item_set_count):
            drop_count = reader.int()
            for _ in range(drop_count):
                item_id = reader.id()
                reader.int()
                if item_id.startswith("Y") and len(item_id) == 4:
                    drop_groups[item_id] += 1

        reader.int()
        reader.float()
        reader.int()
        if version >= 8:
            reader.int()
            reader.int()
            reader.int()

        for _ in range(reader.int()):
            reader.int()
            reader.id()

        for _ in range(reader.int()):
            reader.id()
            reader.int()
            reader.int()

        random_flag = reader.int()
        if random_flag == 0:
            reader.byte()
            reader.byte()
            reader.byte()
            reader.byte()
        elif random_flag == 1:
            reader.int()
            reader.int()
        elif random_flag == 2:
            for _ in range(reader.int()):
                reader.id()
                reader.int()
        else:
            raise RuntimeError(f"Unsupported random unit flag {random_flag}")

        reader.int()
        reader.int()
        reader.int()

    return {group_id: {"rolls": count} for group_id, count in sorted(drop_groups.items())}


def main():
    maps = {}
    for sha1, file_name in replay_maps().items():
        wc3maps_id = WC3MAPS_IDS_BY_SHA1.get(sha1)
        if not wc3maps_id:
            continue

        archive_path = download_map(sha1, file_name, wc3maps_id)
        maps[sha1] = {
            "file": file_name,
            "wc3mapsId": wc3maps_id,
            "dropGroups": parse_units_doo(archive_path),
        }

    OUTPUT_FILE.write_text(
        json.dumps(
            {
                "generatedAt": datetime.now(timezone.utc).isoformat(),
                "source": "Extracted from downloaded WC3Maps archives and keyed by replay map SHA1.",
                "maps": maps,
            },
            indent=2,
        )
        + "\n"
    )


if __name__ == "__main__":
    main()
