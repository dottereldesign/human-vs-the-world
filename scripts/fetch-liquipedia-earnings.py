#!/usr/bin/env python3
import gzip
import html
import json
import re
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_FILE = ROOT / "public" / "liquipedia-human-earnings.json"
BASE_URL = "https://liquipedia.net/warcraft"
API_URL = f"{BASE_URL}/api.php"
USER_AGENT = "human-vs-the-world-local/0.1 (cached local development; polite Liquipedia access)"
REQUEST_DELAY_SECONDS = 2.1
FEATURED_PLAYERS = ["Fortitude", "Sok", "Chaemiko", "Infi", "HawK", "Leon"]
NON_COUNTRY_EARNINGS_PAGES = {
    "",
    "Total",
    "Teams",
    "National_Teams",
    "Race_Teams",
    "Americas",
    "Rest_of_Asia",
    "Europe",
}

COUNTRY_CODES = {
    "Australia": "AU",
    "Argentina": "AR",
    "Belarus": "BY",
    "Bolivia": "BO",
    "Brazil": "BR",
    "Bulgaria": "BG",
    "Canada": "CA",
    "China": "CN",
    "Czech Republic": "CZ",
    "Czechia": "CZ",
    "Denmark": "DK",
    "Finland": "FI",
    "France": "FR",
    "Germany": "DE",
    "Greece": "GR",
    "Hong Kong": "HK",
    "Kazakhstan": "KZ",
    "Malaysia": "MY",
    "Mexico": "MX",
    "Moldova": "MD",
    "Netherlands": "NL",
    "Norway": "NO",
    "Peru": "PE",
    "Poland": "PL",
    "Russia": "RU",
    "Singapore": "SG",
    "South Korea": "KR",
    "Spain": "ES",
    "Sweden": "SE",
    "Taiwan": "TW",
    "Thailand": "TH",
    "Ukraine": "UA",
    "United Kingdom": "GB",
    "United States": "US",
    "Uzbekistan": "UZ",
    "Vietnam": "VN",
}


def country_flag(country):
    code = COUNTRY_CODES.get(country)
    if not code:
        return ""
    return "".join(chr(127397 + ord(letter)) for letter in code)


def request_url(url, accept="text/html"):
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept-Encoding": "gzip",
            "Accept": accept,
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        raw = response.read()
        if response.getheader("content-encoding") == "gzip":
            raw = gzip.decompress(raw)
        return raw.decode("utf-8", "ignore")


def request_json(params):
    url = f"{API_URL}?{urllib.parse.urlencode(params)}"
    return json.loads(request_url(url, "application/json"))


def strip_tags(value):
    return html.unescape(re.sub(r"<.*?>", "", value)).replace("\xa0", " ").strip()


def parse_money(value):
    return float(re.sub(r"[^0-9.]", "", value) or 0)


def parse_field(wikitext, name):
    match = re.search(r"^\|\s*" + re.escape(name) + r"\s*=\s*(.*?)\s*$", wikitext, re.I | re.M)
    return match.group(1).strip() if match else ""


def parse_earnings_table(path="Earnings/Total", fallback_country=""):
    text = request_url(f"{BASE_URL}/{path}")
    header = text.find('<th style="width:150px">Player</th>')
    if header < 0:
        return []

    table = text[text.rfind("<table", 0, header) : text.find("</table>", header) + 8]
    players = []

    for row in table.split("<tr>")[2:]:
        cells = re.findall(r"<t[dh][^>]*>(.*?)</t[dh]>", row, re.S)
        if len(cells) < 8:
            continue

        player_match = re.search(r'<a href="/warcraft/([^"]+)" title="([^"]+)">([^<]+)</a>', cells[1])
        if not player_match:
            continue

        earnings_label = strip_tags(cells[-1])
        players.append(
            {
                "rankOverall": int(strip_tags(cells[0])),
                "page": urllib.parse.unquote(player_match.group(1)),
                "name": strip_tags(player_match.group(3)),
                "earnings": parse_money(earnings_label),
                "earningsLabel": earnings_label,
                "url": f"{BASE_URL}/{player_match.group(1)}",
                "country": fallback_country,
            }
        )

    return players


def parse_country_earnings_pages():
    text = request_url(f"{BASE_URL}/Earnings/Total")
    country_paths = []
    seen_paths = set()

    for page in re.findall(r'href="/warcraft/Earnings/([A-Za-z_]+)"', text):
        if page in NON_COUNTRY_EARNINGS_PAGES or re.fullmatch(r"\d{4}", page):
            continue
        if page in seen_paths:
            continue
        seen_paths.add(page)
        country_paths.append(page)

    players_by_page = {}
    for index, page in enumerate(country_paths):
        country = page.replace("_", " ")
        for player in parse_earnings_table(f"Earnings/{page}", country):
            existing = players_by_page.get(player["page"])
            if not existing or player["earnings"] > existing["earnings"]:
                players_by_page[player["page"]] = player

        if index + 1 < len(country_paths):
            time.sleep(REQUEST_DELAY_SECONDS)

    return sorted(players_by_page.values(), key=lambda player: player["earnings"], reverse=True)


def fetch_wikitext_by_title(titles):
    pages = {}
    for index in range(0, len(titles), 50):
        batch = titles[index : index + 50]
        data = request_json(
            {
                "action": "query",
                "format": "json",
                "prop": "revisions",
                "rvprop": "content",
                "rvslots": "main",
                "titles": "|".join(batch),
            }
        )

        for page in data.get("query", {}).get("pages", {}).values():
            revisions = page.get("revisions") or []
            content = revisions[0].get("slots", {}).get("main", {}).get("*") if revisions else ""
            pages[page.get("title", "")] = content

        if index + 50 < len(titles):
            time.sleep(REQUEST_DELAY_SECONDS)

    return pages


def parse_profile_earnings(player):
    text = request_url(player["url"])
    match = re.search(r"Approx\. Total Winnings:</div><div[^>]*>(.*?)</div>", text, re.S)
    if not match:
        return None
    earnings_label = strip_tags(match.group(1))
    return {
        **player,
        "earnings": parse_money(earnings_label),
        "earningsLabel": earnings_label,
    }


def enrich_player(player, wikitext):
    country = parse_field(wikitext, "country") or player.get("country", "")
    race = parse_field(wikitext, "race").lower()
    liquipedia_id = parse_field(wikitext, "id") or player["name"]

    race_label = "Human" if race in {"h", "human"} else race or "Unknown"
    return {
        **player,
        "liquipediaId": liquipedia_id,
        "country": country,
        "flag": country_flag(country),
        "race": race_label,
    }


def main():
    earnings_rows = parse_country_earnings_pages()
    wikitext = fetch_wikitext_by_title([player["page"] for player in earnings_rows])

    human_players = []
    for player in earnings_rows:
        content = wikitext.get(player["page"]) or wikitext.get(player["name"]) or ""
        enriched = enrich_player(player, content)
        if enriched["race"] == "Human" and enriched["earnings"] > 0:
            enriched["rank"] = len(human_players) + 1
            human_players.append(enriched)

    featured = {}
    for name in FEATURED_PLAYERS:
        existing = next((player for player in human_players if player["name"].lower() == name.lower()), None)
        if existing:
            featured[name.lower()] = existing
            continue

        time.sleep(REQUEST_DELAY_SECONDS)
        profile = parse_profile_earnings({"name": name, "page": name, "url": f"{BASE_URL}/{urllib.parse.quote(name)}"})
        if profile:
            content = fetch_wikitext_by_title([name]).get(name, "")
            featured[name.lower()] = enrich_player(profile, content)

    OUTPUT_FILE.write_text(
        json.dumps(
            {
                "source": f"{BASE_URL}/Earnings/Total",
                "scope": "Built from Liquipedia Warcraft III country earnings pages, filtered to Human player profiles, and ranked by nonzero all-time prize money.",
                "fetchedAt": datetime.now(timezone.utc).isoformat(),
                "players": human_players[:100],
                "featured": featured,
            },
            indent=2,
        )
        + "\n"
    )
    print(f"Wrote {OUTPUT_FILE} with {len(human_players[:100])} ranked Human players")


if __name__ == "__main__":
    main()
