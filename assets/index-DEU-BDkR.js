(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`data:image/png;base64,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`,t=``+new URL(`race-human-icon-BCRfWY1Z.png`,import.meta.url).href,n=``+new URL(`race-night-elf-icon-vXG6szxM.png`,import.meta.url).href,r=``+new URL(`race-orc-icon-wr8Vk2jj.png`,import.meta.url).href,i=``+new URL(`chaemiko-card-DEEbz8Wx.png`,import.meta.url).href,a=``+new URL(`stream-douyu-logo-DMBgkNF1.png`,import.meta.url).href,o=``+new URL(`infi-card-fireball-effect-DpnC32KH.webm`,import.meta.url).href,s=``+new URL(`fortitude-card-BuyWMFOX.png`,import.meta.url).href,c=``+new URL(`hawk-card-DEAfrnwr.png`,import.meta.url).href,l=``+new URL(`site-logo-human-vs-the-world-BmCW_ld6.png`,import.meta.url).href,u=``+new URL(`infi-card-DJS_ISWi.png`,import.meta.url).href,d=``+new URL(`leon-card-wfkqgsr2.png`,import.meta.url).href,f=`data:image/png;base64,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`,ee=``+new URL(`sok-card-CoraQQsH.png`,import.meta.url).href,te=`data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2023.0.6,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%202400%202800'%20style='enable-background:new%200%200%202400%202800;'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%20.st0{fill:%23FFFFFF;}%20%3c/style%3e%3ctitle%3eAsset%203%3c/title%3e%3cg%3e%3cg%20id='Layer_1-2'%3e%3cpath%20class='st0'%20d='M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z%20M2200,1300l-400,400h-400l-350,350v-350H600V200h1600%20V1300z'/%3e%3crect%20x='1700'%20y='550'%20class='st0'%20width='200'%20height='600'/%3e%3crect%20x='1150'%20y='550'%20class='st0'%20width='200'%20height='600'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e`,ne=``+new URL(`race-undead-icon-BiPyrhrw.png`,import.meta.url).href,re={Edem:`/wc3-icons/Edem.png`,Ekee:`/wc3-icons/Ekee.png`,Emoo:`/wc3-icons/Emoo.png`,Ewar:`/wc3-icons/Ewar.png`,Hamg:`/wc3-icons/Hamg.png`,Hblm:`/wc3-icons/Hblm.png`,Hmkg:`/wc3-icons/Hmkg.png`,Hpal:`/wc3-icons/Hpal.png`,Nalc:`/wc3-icons/Nalc.png`,Nbrn:`/wc3-icons/Nbrn.png`,Nbst:`/wc3-icons/Nbst.png`,Nfir:`/wc3-icons/Nfir.png`,Nngs:`/wc3-icons/Nngs.png`,Npbm:`/wc3-icons/Npbm.png`,Nplh:`/wc3-icons/Nplh.png`,Ntin:`/wc3-icons/Ntin.png`,Obla:`/wc3-icons/Obla.png`,Ofar:`/wc3-icons/Ofar.png`,Oshd:`/wc3-icons/Oshd.png`,Otch:`/wc3-icons/Otch.png`,Redc:`/wc3-icons/Redc.png`,Redt:`/wc3-icons/Redt.png`,Reeb:`/wc3-icons/Reeb.png`,Reec:`/wc3-icons/Reec.png`,Rehs:`/wc3-icons/Rehs.png`,Reib:`/wc3-icons/Reib.png`,Rema:`/wc3-icons/Rema.png`,Remg:`/wc3-icons/Remg.png`,Remk:`/wc3-icons/Remk.png`,Renb:`/wc3-icons/Renb.png`,Repb:`/wc3-icons/Repb.png`,Repm:`/wc3-icons/Repm.png`,Rerh:`/wc3-icons/Rerh.png`,Rers:`/wc3-icons/Rers.png`,Resc:`/wc3-icons/Resc.png`,Resi:`/wc3-icons/Resi.png`,Resm:`/wc3-icons/Resm.png`,Resw:`/wc3-icons/Resw.png`,Reuv:`/wc3-icons/Reuv.png`,Rews:`/wc3-icons/Rews.png`,Rhac:`/wc3-icons/Rhac.png`,Rhan:`/wc3-icons/Rhan.png`,Rhar:`/wc3-icons/Rhar.png`,Rhcd:`/wc3-icons/Rhcd.png`,Rhde:`/wc3-icons/Rhde.png`,Rhfc:`/wc3-icons/Rhfc.png`,Rhfl:`/wc3-icons/Rhfl.png`,Rhfs:`/wc3-icons/Rhfs.png`,Rhgb:`/wc3-icons/Rhgb.png`,Rhhb:`/wc3-icons/Rhhb.png`,Rhla:`/wc3-icons/Rhla.png`,Rhlh:`/wc3-icons/Rhlh.png`,Rhme:`/wc3-icons/Rhme.png`,Rhpm:`/wc3-icons/Rhpm.png`,Rhpt:`/wc3-icons/Rhpt.png`,Rhra:`/wc3-icons/Rhra.png`,Rhri:`/wc3-icons/Rhri.png`,Rhrt:`/wc3-icons/Rhrt.png`,Rhse:`/wc3-icons/Rhse.png`,Rhss:`/wc3-icons/Rhss.png`,Rhst:`/wc3-icons/Rhst.png`,Roar:`/wc3-icons/Roar.png`,Robk:`/wc3-icons/Robk.png`,Robs:`/wc3-icons/Robs.png`,Roen:`/wc3-icons/Roen.png`,Rome:`/wc3-icons/Rome.png`,Ropg:`/wc3-icons/Ropg.png`,Ropm:`/wc3-icons/Ropm.png`,Rora:`/wc3-icons/Rora.png`,Rorb:`/wc3-icons/Rorb.png`,Rosp:`/wc3-icons/Rosp.png`,Rost:`/wc3-icons/Rost.png`,Rotr:`/wc3-icons/Rotr.png`,Rovs:`/wc3-icons/Rovs.png`,Rowd:`/wc3-icons/Rowd.png`,Rows:`/wc3-icons/Rows.png`,Rowt:`/wc3-icons/Rowt.png`,Ruac:`/wc3-icons/Ruac.png`,Ruar:`/wc3-icons/Ruar.png`,Ruba:`/wc3-icons/Ruba.png`,Rubu:`/wc3-icons/Rubu.png`,Rucr:`/wc3-icons/Rucr.png`,Ruex:`/wc3-icons/Ruex.png`,Rugf:`/wc3-icons/Rugf.png`,Rume:`/wc3-icons/Rume.png`,Rune:`/wc3-icons/Rune.png`,Rupc:`/wc3-icons/Rupc.png`,Rupm:`/wc3-icons/Rupm.png`,Rura:`/wc3-icons/Rura.png`,Rusf:`/wc3-icons/Rusf.png`,Rusm:`/wc3-icons/Rusm.png`,Rusp:`/wc3-icons/Rusp.png`,Ruwb:`/wc3-icons/Ruwb.png`,Rwdm:`/wc3-icons/Rwdm.png`,Ucrl:`/wc3-icons/Ucrl.png`,Udea:`/wc3-icons/Udea.png`,Udre:`/wc3-icons/Udre.png`,Ulic:`/wc3-icons/Ulic.png`,ajen:`/wc3-icons/ajen.png`,belv:`/wc3-icons/belv.png`,bspd:`/wc3-icons/bspd.png`,clsd:`/wc3-icons/clsd.png`,cnob:`/wc3-icons/cnob.png`,dust:`/wc3-icons/dust.png`,eaoe:`/wc3-icons/eaoe.png`,eaom:`/wc3-icons/eaom.png`,eaow:`/wc3-icons/eaow.png`,earc:`/wc3-icons/earc.png`,eate:`/wc3-icons/eate.png`,ebal:`/wc3-icons/ebal.png`,echm:`/wc3-icons/echm.png`,eden:`/wc3-icons/eden.png`,edob:`/wc3-icons/edob.png`,edoc:`/wc3-icons/edoc.png`,edos:`/wc3-icons/edos.png`,edot:`/wc3-icons/edot.png`,edry:`/wc3-icons/edry.png`,efdr:`/wc3-icons/efdr.png`,ehip:`/wc3-icons/ehip.png`,emow:`/wc3-icons/emow.png`,emtg:`/wc3-icons/emtg.png`,esen:`/wc3-icons/esen.png`,etoa:`/wc3-icons/etoa.png`,etoe:`/wc3-icons/etoe.png`,etol:`/wc3-icons/etol.png`,etrp:`/wc3-icons/etrp.png`,ewsp:`/wc3-icons/ewsp.png`,gcel:`/wc3-icons/gcel.png`,halt:`/wc3-icons/halt.png`,harm:`/wc3-icons/harm.png`,hars:`/wc3-icons/hars.png`,hatw:`/wc3-icons/hatw.png`,hbar:`/wc3-icons/hbar.png`,hbla:`/wc3-icons/hbla.png`,hcas:`/wc3-icons/hcas.png`,hctw:`/wc3-icons/hctw.png`,hdhw:`/wc3-icons/hdhw.png`,hfoo:`/wc3-icons/hfoo.png`,hgra:`/wc3-icons/hgra.png`,hgry:`/wc3-icons/hgry.png`,hgtw:`/wc3-icons/hgtw.png`,hgyr:`/wc3-icons/hgyr.png`,hhou:`/wc3-icons/hhou.png`,hkee:`/wc3-icons/hkee.png`,hkni:`/wc3-icons/hkni.png`,hlum:`/wc3-icons/hlum.png`,hmpr:`/wc3-icons/hmpr.png`,hmtm:`/wc3-icons/hmtm.png`,hmtt:`/wc3-icons/hmtt.png`,hpea:`/wc3-icons/hpea.png`,hrif:`/wc3-icons/hrif.png`,hrtt:`/wc3-icons/hrtt.png`,hslv:`/wc3-icons/hslv.png`,hsor:`/wc3-icons/hsor.png`,hspt:`/wc3-icons/hspt.png`,htow:`/wc3-icons/htow.png`,hvlt:`/wc3-icons/hvlt.png`,hwtw:`/wc3-icons/hwtw.png`,mcri:`/wc3-icons/mcri.png`,moon:`/wc3-icons/moon.png`,nfsp:`/wc3-icons/nfsp.png`,nftb:`/wc3-icons/nftb.png`,ngir:`/wc3-icons/ngir.png`,ngrk:`/wc3-icons/ngrk.png`,ngsp:`/wc3-icons/ngsp.png`,nogm:`/wc3-icons/nogm.png`,nzep:`/wc3-icons/nzep.png`,oalt:`/wc3-icons/oalt.png`,obar:`/wc3-icons/obar.png`,obea:`/wc3-icons/obea.png`,ocat:`/wc3-icons/ocat.png`,ocor:`/wc3-icons/ocor.png`,odoc:`/wc3-icons/odoc.png`,ofor:`/wc3-icons/ofor.png`,ofrt:`/wc3-icons/ofrt.png`,ogre:`/wc3-icons/ogre.png`,ogru:`/wc3-icons/ogru.png`,ohun:`/wc3-icons/ohun.png`,okod:`/wc3-icons/okod.png`,oli2:`/wc3-icons/oli2.png`,opeo:`/wc3-icons/opeo.png`,orai:`/wc3-icons/orai.png`,oshm:`/wc3-icons/oshm.png`,osld:`/wc3-icons/osld.png`,oslo:`/wc3-icons/oslo.png`,ospm:`/wc3-icons/ospm.png`,ostr:`/wc3-icons/ostr.png`,otau:`/wc3-icons/otau.png`,otbk:`/wc3-icons/otbk.png`,otbr:`/wc3-icons/otbr.png`,otrb:`/wc3-icons/otrb.png`,otto:`/wc3-icons/otto.png`,oven:`/wc3-icons/oven.png`,ovln:`/wc3-icons/ovln.png`,owtw:`/wc3-icons/owtw.png`,owyv:`/wc3-icons/owyv.png`,pams:`/wc3-icons/pams.png`,penr:`/wc3-icons/penr.png`,pghe:`/wc3-icons/pghe.png`,phea:`/wc3-icons/phea.png`,pinv:`/wc3-icons/pinv.png`,plcl:`/wc3-icons/plcl.png`,pman:`/wc3-icons/pman.png`,pnvl:`/wc3-icons/pnvl.png`,prvt:`/wc3-icons/prvt.png`,rag1:`/wc3-icons/rag1.png`,rat6:`/wc3-icons/rat6.png`,rat9:`/wc3-icons/rat9.png`,rde2:`/wc3-icons/rde2.png`,rde4:`/wc3-icons/rde4.png`,rin1:`/wc3-icons/rin1.png`,rnec:`/wc3-icons/rnec.png`,rnsp:`/wc3-icons/rnsp.png`,shas:`/wc3-icons/shas.png`,shea:`/wc3-icons/shea.png`,skul:`/wc3-icons/skul.png`,spre:`/wc3-icons/spre.png`,spro:`/wc3-icons/spro.png`,sreg:`/wc3-icons/sreg.png`,ssan:`/wc3-icons/ssan.png`,stel:`/wc3-icons/stel.png`,stwp:`/wc3-icons/stwp.png`,tgrh:`/wc3-icons/tgrh.png`,tret:`/wc3-icons/tret.png`,tsct:`/wc3-icons/tsct.png`,uabo:`/wc3-icons/uabo.png`,uaco:`/wc3-icons/uaco.png`,uaod:`/wc3-icons/uaod.png`,uban:`/wc3-icons/uban.png`,ubon:`/wc3-icons/ubon.png`,ucry:`/wc3-icons/ucry.png`,ufro:`/wc3-icons/ufro.png`,ugar:`/wc3-icons/ugar.png`,ugho:`/wc3-icons/ugho.png`,ugol:`/wc3-icons/ugol.png`,ugrv:`/wc3-icons/ugrv.png`,umtw:`/wc3-icons/umtw.png`,unec:`/wc3-icons/unec.png`,unp1:`/wc3-icons/unp1.png`,unp2:`/wc3-icons/unp2.png`,unpl:`/wc3-icons/unpl.png`,uobs:`/wc3-icons/uobs.png`,usap:`/wc3-icons/usap.png`,usep:`/wc3-icons/usep.png`,uslh:`/wc3-icons/uslh.png`,utod:`/wc3-icons/utod.png`,utom:`/wc3-icons/utom.png`,uzg1:`/wc3-icons/uzg1.png`,uzg2:`/wc3-icons/uzg2.png`,uzig:`/wc3-icons/uzig.png`,will:`/wc3-icons/will.png`,wneg:`/wc3-icons/wneg.png`},ie={amrc:`i_Amulet of Recall`,ankh:`i_Ankh of Reincarnation`,belv:`i_Boots of Quel'Thalas +6`,bgst:`i_Belt of Giant Strength +6`,bspd:`i_Boots of Speed`,ccmd:`i_Scepter of Mastery`,ciri:`i_Robe of the Magi +6`,ckng:`i_Crown of Kings +5`,clsd:`i_Cloak of Shadows`,crys:`i_Crystal Ball`,desc:`i_Kelen's Dagger of Escape`,gemt:`i_Gem of True Seeing`,gobm:`i_Goblin Land Mines`,gsou:`i_Soul Gem`,guvi:`i_Glyph of Ultravision`,gfor:`i_Glyph of Fortification`,soul:`i_Soul`,mdpb:`i_Medusa Pebble`,rag1:`i_Slippers of Agility +3`,rat3:`i_Claws of Attack +3`,rin1:`i_Mantle of Intelligence +3`,rde1:`i_Ring of Protection +2`,rde2:`i_Ring of Protection +3`,rde3:`i_Ring of Protection +4`,rhth:`i_Khadgar's Gem of Health`,rst1:`i_Gauntlets of Ogre Strength +3`,ofir:`i_Orb of Fire`,ofro:`i_Orb of Frost`,olig:`i_Orb of Lightning`,oli2:`i_Orb of Lightning`,oven:`i_Orb of Venom`,odef:`i_Orb of Darkness`,ocor:`i_Orb of Corruption`,pdiv:`i_Potion of Divinity`,phea:`i_Potion of Healing`,pghe:`i_Potion of Greater Healing`,pinv:`i_Potion of Invisibility`,pgin:`i_Potion of Greater Invisibility`,pman:`i_Potion of Mana`,pgma:`i_Potion of Greater Mana`,pnvu:`i_Potion of Invulnerability`,pnvl:`i_Potion of Lesser Invulnerability`,pres:`i_Potion of Restoration`,pspd:`i_Potion of Speed`,rlif:`i_Ring of Regeneration`,rwiz:`i_Sobi Mask`,sfog:`i_Horn of the Clouds`,shea:`i_Scroll of Healing`,sman:`i_Scroll of Mana`,spro:`i_Scroll of Protection`,sres:`i_Scroll of Restoration`,ssil:`i_Staff of Silence`,stwp:`i_Scroll of Town Portal`,tels:`i_Goblin Night Scope`,tdex:`i_Tome of Agility`,texp:`i_Tome of Experience`,tint:`i_Tome of Intelligence`,tkno:`i_Tome of Power`,tstr:`i_Tome of Strength`,ward:`i_Warsong Battle Drums`,will:`i_Wand of Illusion`,wneg:`i_Wand of Negation`,rdis:`i_Rune of Dispel Magic`,rwat:`i_Rune of the Watcher`,fgrd:`i_Red Drake Egg`,fgrg:`i_Stone Token`,fgdg:`i_Demonic Figurine`,fgfh:`i_Spiked Collar`,fgsk:`i_Book of the Dead`,engs:`i_Enchanted Gemstone`,k3m1:`i_Mooncrystal`,modt:`i_Mask of Death`,sand:`i_Scroll of Animate Dead`,srrc:`i_Scroll of Resurrection`,sror:`i_Scroll of the Beast`,infs:`i_Inferno Stone`,shar:`i_Ice Shard`,wild:`i_Amulet of the Wild`,wswd:`i_Sentry Wards`,whwd:`i_Healing Wards`,wlsd:`i_Wand of Lightning Shield`,wcyc:`i_Wand of the Wind`,rnec:`i_Rod of Necromancy`,pams:`i_Anti-magic Potion`,clfm:`i_Cloak of Flames`,evtl:`i_Talisman of Evasion`,nspi:`i_Necklace of Spell Immunity`,lhst:`i_The Lion Horn of Stormwind`,kpin:`i_Khadgar's Pipe of Insight`,sbch:`i_Scourge Bone Chimes`,afac:`i_Alleria's Flute of Accuracy`,ajen:`i_Ancient Janggo of Endurance`,lgdh:`i_Legion Doom-Horn`,hcun:`i_Hood of Cunning`,mcou:`i_Medallion of Courage`,hval:`i_Helm of Valor`,cnob:`i_Circlet of Nobility`,prvt:`i_Periapt of Vitality`,tgxp:`i_Tome of Greater Experience`,mnst:`i_Mana Stone`,hlst:`i_Health Stone`,tpow:`i_Tome of Knowledge`,tst2:`i_Tome of Strength +2`,tin2:`i_Tome of Intelligence +2`,tdx2:`i_Tome of Agility +2`,rde0:`i_Ring of Protection +1`,rde4:`i_Ring of Protection +5`,rat6:`i_Claws of Attack +6`,rat9:`i_Claws of Attack +9`,ratc:`i_Claws of Attack +12`,ratf:`i_Claws of Attack +15`,manh:`i_Manual of Health`,pmna:`i_Pendant of Mana`,penr:`i_Pendant of Energy`,gcel:`i_Gloves of Haste`,totw:`i_Talisman of the Wild`,phlt:`i_Phat Lewt`,gopr:`i_Glyph of Purification`,ches:`i_Cheese`,mlst:`i_Maul of Strength`,rnsp:`i_Ring of Superiority`,brag:`i_Bracer of Agility`,sksh:`i_Skull Shield`,vddl:`i_Voodoo Doll`,sprn:`i_Spider Ring`,tmmt:`i_Totem of Might`,anfg:`i_Ancient Figurine`,lnrn:`i_Lion's Ring`,iwbr:`i_Ironwood Branch`,jdrn:`i_Jade Ring`,drph:`i_Druid Pouch`,hslv:`i_Healing Salve`,pclr:`i_Clarity Potion`,plcl:`i_Lesser Clarity Potion`,rej1:`i_Minor Replenishment Potion`,rej2:`i_Lesser Replenishment Potion`,rej3:`i_Replenishment Potion`,rej4:`i_Greater Replenishment Potion`,rej5:`i_Lesser Scroll of Replenishment `,rej6:`i_Greater Scroll of Replenishment `,sreg:`i_Scroll of Regeneration`,gold:`i_Gold Coins`,lmbr:`i_Bundle of Lumber`,fgun:`i_Flare Gun`,pomn:`i_Potion of Omniscience`,gomn:`i_Glyph of Omniscience`,wneu:`i_Wand of Neutralization`,silk:`i_Spider Silk Broach`,lure:`i_Monster Lure`,skul:`i_Sacrificial Skull`,moon:`i_Moonstone`,brac:`i_Runed Bracers`,vamp:`i_Vampiric Potion`,woms:`i_Wand of Mana Stealing`,tcas:`i_Tiny Castle`,tgrh:`i_Tiny Great Hall`,tsct:`i_Ivory Tower`,wshs:`i_Wand of Shadowsight`,tret:`i_Tome of Retraining`,sneg:`i_Staff of Negation`,stel:`i_Staff of Teleportation`,spre:`i_Staff of Preservation`,mcri:`i_Mechanical Critter`,spsh:`i_Amulet of Spell Shield`,sbok:`i_Spell Book`,ssan:`i_Staff of Sanctuary`,shas:`i_Scroll of Speed`,dust:`i_Dust of Appearance`,oslo:`i_Orb of Slow`,dsum:`i_Diamond of Summoning`,sor1:`i_Shadow Orb +1`,sor2:`i_Shadow Orb +2`,sor3:`i_Shadow Orb +3`,sor4:`i_Shadow Orb +4`,sor5:`i_Shadow Orb +5`,sor6:`i_Shadow Orb +6`,sor7:`i_Shadow Orb +7`,sor8:`i_Shadow Orb +8`,sor9:`i_Shadow Orb +9`,sora:`i_Shadow Orb +10`,sorf:`i_Shadow Orb Fragment`,fwss:`i_Frost Wyrm Skull Shield`,ram1:`i_Ring of the Archmagi`,ram2:`i_Ring of the Archmagi`,ram3:`i_Ring of the Archmagi`,ram4:`i_Ring of the Archmagi`,shtm:`i_Shamanic Totem`,shwd:`i_Shimmerweed`,btst:`i_Battle Standard`,skrt:`i_Skeletal Artifact`,thle:`i_Thunder Lizard Egg`,sclp:`i_Secret Level Powerup`,gldo:`i_Orb of Kil'jaeden`,tbsm:`i_Tiny Blacksmith`,tfar:`i_Tiny Farm`,tlum:`i_Tiny Lumber Mill`,tbar:`i_Tiny Barracks`,tbak:`i_Tiny Altar of Kings`,mgtk:`i_Magic Key Chain`,stre:`i_Staff of Reanimation`,horl:`i_Sacred Relic`,hbth:`i_Helm of Battlethirst`,blba:`i_Bladebane Armor`,rugt:`i_Runed Gauntlets`,frhg:`i_Firehand Gauntlets`,gvsm:`i_Gloves of Spell Mastery`,crdt:`i_Crown of the Deathlord`,arsc:`i_Arcane Scroll`,scul:`i_Scroll of the Unholy Legion`,tmsc:`i_Tome of Sacrifices`,dtsb:`i_Drek'thar's Spellbook`,grsl:`i_Grimoire of Souls`,arsh:`i_Arcanite Shield`,shdt:`i_Shield of the Deathlord`,shhn:`i_Shield of Honor`,shen:`i_Enchanted Shield`,thdm:`i_Thunderlizard Diamond`,stpg:`i_Clockwork Penguin`,shrs:`i_Shimmerglaze Roast`,bfhr:`i_Bloodfeather's Heart`,cosl:`i_Celestial Orb of Souls`,shcw:`i_Shaman Claws`,srbd:`i_Searing Blade`,frgd:`i_Frostguard`,envl:`i_Enchanted Vial`,rump:`i_Rusty Mining Pick`,mort:`i_Mogrin's Report`,srtl:`i_Serathil`,stwa:`i_Sturdy War Axe`,klmm:`i_Killmaim`,rots:`i_Scepter of the Sea`,axas:`i_Ancestral Staff`,mnsf:`i_Mindstaff`,schl:`i_Scepter of Healing`,asbl:`i_Assassin's Blade`,kgal:`i_Keg of Ale`,dphe:`i_Thunder Phoenix Egg`,dkfw:`i_Keg of Thunderwater`,dthb:`i_Thunderbloom Bulb`},ae={hfoo:`u_Footman`,hkni:`u_Knight`,hmpr:`u_Priest`,hmtm:`u_Mortar Team`,hpea:`u_Peasant`,hrif:`u_Rifleman`,hsor:`u_Sorceress`,hmtt:`u_Siege Engine`,hrtt:`u_Siege Engine`,hgry:`u_Gryphon Rider`,hgyr:`u_Flying Machine`,hspt:`u_Spell Breaker`,hdhw:`u_Dragonhawk Rider`,ebal:`u_Glaive Thrower`,echm:`u_Chimaera`,edoc:`u_Druid of the Claw`,edot:`u_Druid of the Talon`,ewsp:`u_Wisp`,esen:`u_Huntress`,earc:`u_Archer`,edry:`u_Dryad`,ehip:`u_Hippogryph`,emtg:`u_Mountain Giant`,efdr:`u_Faerie Dragon`,ocat:`u_Demolisher`,odoc:`u_Troll Witch Doctor`,ogru:`u_Grunt`,ohun:`u_Troll Headhunter/Berserker`,otbk:`u_Troll Headhunter/Berserker`,okod:`u_Kodo Beast`,opeo:`u_Peon`,orai:`u_Raider`,oshm:`u_Shaman`,otau:`u_Tauren`,owyv:`u_Wind Rider`,ospw:`u_Spirit Walker`,ospm:`u_Spirit Walker`,otbr:`u_Troll Batrider`,uaco:`u_Acolyte`,uabo:`u_Abomination`,uban:`u_Banshee`,ucry:`u_Crypt Fiend`,ufro:`u_Frost Wyrm`,ugar:`u_Gargoyle`,ugho:`u_Ghoul`,unec:`u_Necromancer`,umtw:`u_Meatwagon`,ushd:`u_Shade`,uobs:`u_Obsidian Statue`,ubsp:`u_Destroyer`,nskm:`u_Skeletal Marksman`,nskf:`u_Burning Archer`,nws1:`u_Dragon Hawk`,nban:`u_Bandit`,nrog:`u_Rogue`,nenf:`u_Enforcer`,nass:`u_Assassin`,nbdk:`u_Black Drake`,nrdk:`u_Red Dragon Whelp`,nbdr:`u_Black Dragon Whelp`,nrdr:`u_Red Drake`,nbwm:`u_Black Dragon`,nrwm:`u_Red Dragon`,nadr:`u_Blue Dragon`,nadw:`u_Blue Dragon Whelp`,nadk:`u_Blue Drake`,nbzd:`u_Bronze Dragon`,nbzk:`u_Bronze Drake`,nbzw:`u_Bronze Dragon Whelp`,ngrd:`u_Green Dragon`,ngdk:`u_Green Drake`,ngrw:`u_Green Dragon Whelp`,ncea:`u_Centaur Archer`,ncen:`u_Centaur Outrunner`,ncer:`u_Centaur Drudge`,ndth:`u_Dark Troll High Priest`,ndtp:`u_Dark Troll Shadow Priest`,ndtb:`u_Dark Troll Berserker`,ndtw:`u_Dark Troll Warlord`,ndtr:`u_Dark Troll`,ndtt:`u_Dark Troll Trapper`,nfsh:`u_Forest Troll High Priest`,nfsp:`u_Forest Troll Shadow Priest`,nftr:`u_Forest Troll`,nftb:`u_Forest Troll Berserker`,nftt:`u_Forest Troll Trapper`,nftk:`u_Forest Troll Warlord`,ngrk:`u_Mud Golem`,ngir:`u_Goblin Shredder`,nfrs:`u_Furbolg Shaman`,ngna:`u_Gnoll Poacher`,ngns:`u_Gnoll Assassin`,ngno:`u_Gnoll`,ngnb:`u_Gnoll Brute`,ngnw:`u_Gnoll Warden`,ngnv:`u_Gnoll Overseer`,ngsp:`u_Goblin Sapper`,nhrr:`u_Harpy Rogue`,nhrw:`u_Harpy Windwitch`,nits:`u_Ice Troll Berserker`,nitt:`u_Ice Troll Trapper`,nkob:`u_Kobold`,nkog:`u_Kobold Geomancer`,nthl:`u_Thunder Lizard`,nmfs:`u_Murloc Flesheater`,nmrr:`u_Murloc Huntsman`,nowb:`u_Wildkin`,nrzm:`u_Razormane Medicine Man`,nnwa:`u_Nerubian Warrior`,nnwl:`u_Nerubian Webspinner`,nogr:`u_Ogre Warrior`,nogm:`u_Ogre Mauler`,nogl:`u_Ogre Lord`,nomg:`u_Ogre Magi`,nrvs:`u_Frost Revenant`,nslf:`u_Sludge Flinger`,nsts:`u_Satyr Shadowdancer`,nstl:`u_Satyr Soulstealer`,nzep:`u_Goblin Zeppelin`,ntrt:`u_Giant Sea Turtle`,nlds:`u_Makrura Deepseer`,nlsn:`u_Makrura Snapper`,nmsn:`u_Mur'gul Snarecaster`,nscb:`u_Spider Crab Shorecrawler`,nbot:`u_Transport Ship`,nsc2:`u_Spider Crab Limbripper`,nsc3:`u_Spider Crab Behemoth`,nbdm:`u_Blue Dragonspawn Meddler`,nmgw:`u_Magnataur Warrior`,nanb:`u_Barbed Arachnathid`,nanm:`u_Barbed Arachnathid`,nfps:`u_Polar Furbolg Shaman`,nmgv:`u_Magic Vault`,nitb:`u_Icy Treasure Box`,npfl:`u_Fel Beast`,ndrd:`u_Draenei Darkslayer`,ndrm:`u_Draenei Disciple`,nvdw:`u_Voidwalker`,nvdg:`u_Greater Voidwalker`,nnht:`u_Nether Dragon Hatchling`,nndk:`u_Nether Drake`,nndr:`u_Nether Dragon`},oe={hhou:`Farm`,halt:`Altar of Kings`,harm:`Workshop`,hars:`Arcane Sanctum`,hbar:`Barracks`,hbla:`Blacksmith`,hgra:`Gryphon Aviary`,hwtw:`Scout Tower`,hvlt:`Arcane Vault`,hlum:`Lumber Mill`,htow:`Town Hall`,hkee:`b_Keep`,hcas:`b_Castle`,hctw:`b_Cannon Tower`,hgtw:`b_Guard Tower`,hatw:`b_Arcane Tower`,etrp:`Ancient Protector`,etol:`Tree of Life`,edob:`Hunter's Hall`,eate:`Altar of Elders`,eden:`Ancient of Wonders`,eaoe:`Ancient of Lore`,eaom:`Ancient of War`,eaow:`Ancient of Wind`,edos:`Chimaera Roost`,emow:`Moon Well`,etoa:`b_Tree of Ages`,etoe:`b_Tree of Eternity`,oalt:`Altar of Storms`,obar:`Barracks`,obea:`Beastiary`,ofor:`War Mill`,ogre:`Great Hall`,osld:`Spirit Lodge`,otrb:`Orc Burrow`,orbr:`Reinforced Orc Burrow`,otto:`Tauren Totem`,ovln:`Voodoo Lounge`,owtw:`Watch Tower`,ofrt:`b_Fortress`,ostr:`b_Stronghold`,uaod:`Altar of Darkness`,unpl:`Necropolis`,usep:`Crypt`,utod:`Temple of the Damned`,utom:`Tomb of Relics`,ugol:`Haunted Gold Mine`,uzig:`Ziggurat`,ubon:`Boneyard`,usap:`Sacrificial Pit`,uslh:`Slaughterhouse`,ugrv:`Graveyard`,unp1:`b_Halls of the Dead`,unp2:`b_Black Citadel`,uzg1:`b_Spirit Tower`,uzg2:`b_Nerubian Tower`},se={Rhss:`p_Control Magic`,Rhme:`p_Swords`,Rhra:`p_Gunpowder`,Rhar:`p_Plating`,Rhla:`p_Armor`,Rhac:`p_Masonry`,Rhgb:`p_Flying Machine Bombs`,Rhlh:`p_Lumber Harvesting`,Rhde:`p_Defend`,Rhan:`p_Animal War Training`,Rhpt:`p_Priest Training`,Rhst:`p_Sorceress Training`,Rhri:`p_Long Rifles`,Rhse:`p_Magic Sentry`,Rhfl:`p_Flare`,Rhhb:`p_Storm Hammers`,Rhrt:`p_Barrage`,Rhpm:`p_Backpack`,Rhfc:`p_Flak Cannons`,Rhfs:`p_Fragmentation Shards`,Rhcd:`p_Cloud`,Resm:`p_Strength of the Moon`,Resw:`p_Strength of the Wild`,Rema:`p_Moon Armor`,Rerh:`p_Reinforced Hides`,Reuv:`p_Ultravision`,Renb:`p_Nature's Blessing`,Reib:`p_Improved Bows`,Remk:`p_Marksmanship`,Resc:`p_Sentinel`,Remg:`p_Upgrade Moon Glaive`,Redt:`p_Druid of the Talon Training`,Redc:`p_Druid of the Claw Training`,Resi:`p_Abolish Magic`,Reht:`p_Hippogryph Taming`,Recb:`p_Corrosive Breath`,Repb:`p_Vorpal Blades`,Rers:`p_Resistant Skin`,Rehs:`p_Hardened Skin`,Reeb:`p_Mark of the Claw`,Reec:`p_Mark of the Talon`,Rews:`p_Well Spring`,Repm:`p_Backpack`,Roch:`p_Chaos`,Rome:`p_Melee Weapons`,Rora:`p_Ranged Weapons`,Roar:`p_Armor`,Rwdm:`p_War Drums Damage Increase`,Ropg:`p_Pillage`,Robs:`p_Berserker Strength`,Rows:`p_Pulverize`,Roen:`p_Ensnare`,Rovs:`p_Envenomed Spears`,Rowd:`p_Witch Doctor Training`,Rost:`p_Shaman Training`,Rosp:`p_Spiked Barricades`,Rotr:`p_Troll Regeneration`,Rolf:`p_Liquid Fire`,Ropm:`p_Backpack`,Rowt:`p_Spirit Walker Training`,Robk:`p_Berserker Upgrade`,Rorb:`p_Reinforced Defenses`,Robf:`p_Burning Oil`,Rusp:`p_Destroyer Form`,Rume:`p_Unholy Strength`,Rura:`p_Creature Attack`,Ruar:`p_Unholy Armor`,Rucr:`p_Creature Carapace`,Ruac:`p_Cannibalize`,Rugf:`p_Ghoul Frenzy`,Ruwb:`p_Web`,Rusf:`p_Stone Form`,Rune:`p_Necromancer Training`,Ruba:`p_Banshee Training`,Rufb:`p_Freezing Breath`,Rusl:`p_Skeletal Longevity`,Rupc:`p_Disease Cloud`,Rusm:`p_Skeletal Mastery`,Rubu:`p_Burrow`,Ruex:`p_Exhume Corpses`,Rupm:`p_Backpack`};Object.keys(ie);var ce=[{slug:`fortitude`,name:`Fortitude`,realName:`Xu Yuxing`,flag:`🇨🇳`,countryName:`China`,rank:3,elo:2662,streamUrl:`https://www.douyu.com/541946`,liquipediaUrl:`https://liquipedia.net/warcraft/Fortitude`,replayPackUrl:`replay-packs/fortitude-2026-human-wins.zip`},{slug:`sok`,name:`Sok`,realName:`Jung Ho-wook`,flag:`🇰🇷`,countryName:`South Korea`,city:`Sokcho`,rank:11,elo:2571,streamUrl:`https://www.twitch.tv/jhw3767`,liquipediaUrl:`https://liquipedia.net/warcraft/Sok`,replayPackUrl:`replay-packs/sok-2026-human-wins.zip`},{slug:`chaemiko`,name:`Chaemiko`,realName:`Moon Chae-young`,flag:`🇰🇷`,countryName:`South Korea`,rank:12,elo:2504,streamUrl:`https://www.twitch.tv/chaeyoung1994`,liquipediaUrl:`https://liquipedia.net/warcraft/Chaemiko`,replayPackUrl:`replay-packs/chaemiko-2026-human-wins.zip`},{slug:`infi`,name:`Infi`,realName:`Wang Xuwen`,flag:`🇨🇳`,countryName:`China`,city:`Shangluo, Shaanxi`,rank:16,elo:2455,streamUrl:`https://www.douyu.com/255865`,liquipediaUrl:`https://liquipedia.net/warcraft/Infi`,replayPackUrl:`replay-packs/infi-2026-human-wins.zip`},{slug:`hawk`,name:`HawK`,realName:`Sergey Shcherbakov`,flag:`🇷🇺`,countryName:`Russia`,city:`Aleksandrov`,rank:24,elo:2341,streamUrl:`https://www.twitch.tv/lookhawk`,liquipediaUrl:`https://liquipedia.net/warcraft/HawK`,replayPackUrl:`replay-packs/hawk-2026-human-wins.zip`},{slug:`leon`,name:`Leon`,realName:`Leon Hoge`,flag:`🇩🇪`,countryName:`Germany`,rank:26,elo:2333,streamUrl:`https://www.twitch.tv/LeonWC3`,liquipediaUrl:`https://liquipedia.net/warcraft/Leon`,replayPackUrl:`replay-packs/leon-2026-human-wins.zip`}],p=null,le=null,ue=null,de=null,fe=null,m=null,pe=``,h=`all`,g=`all`,_=`all`,v=`all`,y=1,b=null,x=null,S=!1,C=0,w=null,T=`overview`,E=!1,D=`sources`,O=!1,me=`unknown`,k=[`legacy`,`reforged`].includes(localStorage.getItem(`wc3-warsmash-selected-edition`))?localStorage.getItem(`wc3-warsmash-selected-edition`):`legacy`,A={checked:!1,preparing:!1,ready:!1,build:``,fileCount:0,totalGb:`0.00`,error:``},j={running:!1,done:0,total:0,bytes:0,totalBytes:0,currentName:``,error:``},he=!1,ge=null,_e=!1,ve=null,ye=25,be=[{id:`overview`,label:`Overview`},{id:`apm`,label:`APM`},{id:`build`,label:`Build Order`},{id:`upgrades`,label:`Upgrades`},{id:`items-bought`,label:`Items Bought`},{id:`items-found`,label:`Items Found`},{id:`chat`,label:`Chatlog`},{id:`actions`,label:`Actions`}],xe=[{id:`sources`,label:`Data Sources`},{id:`analyze`,label:`Analyze Tabs`},{id:`updates`,label:`Keeping Updated`},{id:`features`,label:`Next Features`},{id:`renderer`,label:`Game Renderer`},{id:`github`,label:`GitHub`}],Se={Hamg:`Archmage`,Hblm:`Blood Mage`,Hmkg:`Mountain King`,Hpal:`Paladin`,Edem:`Demon Hunter`,Ekee:`Keeper of the Grove`,Emoo:`Priestess of the Moon`,Ewar:`Warden`,Obla:`Blademaster`,Ofar:`Far Seer`,Oshd:`Shadow Hunter`,Otch:`Tauren Chieftain`,Udea:`Death Knight`,Udre:`Dreadlord`,Ulic:`Lich`,Ucrl:`Crypt Lord`,Nbrn:`Dark Ranger`,Nbst:`Beastmaster`,Nfir:`Firelord`,Npbm:`Pandaren Brewmaster`,Nplh:`Pit Lord`,Ntin:`Tinker`,Nalc:`Goblin Alchemist`,Nngs:`Naga Sea Witch`,hpea:`Peasant`,hfoo:`Footman`,hrif:`Rifleman`,hkni:`Knight`,hmpr:`Priest`,hsor:`Sorceress`,hmtm:`Mortar Team`,hgry:`Gryphon Rider`,hmil:`Militia`,halt:`Altar of Kings`,hhou:`Farm`,hbar:`Barracks`,hbla:`Blacksmith`,hvlt:`Arcane Vault`,hwtw:`Scout Tower`,hatw:`Arcane Tower`,hctw:`Cannon Tower`,hkee:`Keep`,hcas:`Castle`,hars:`Arcane Sanctum`,hgra:`Gryphon Aviary`,Rhri:`Long Rifles`,Rhra:`Rifle Armor`,Rhpt:`Priest Training`,Rhst:`Sorceress Training`,Rhla:`Animal War Training`,bspd:`Boots of Speed`,shea:`Scroll of Healing`},M={ajen:null,belv:null,bspd:250,clsd:null,cnob:null,dust:75,gcel:null,hslv:100,mcri:50,moon:50,ocor:375,oli2:375,oslo:null,oven:375,pams:100,penr:null,phea:150,pghe:400,pinv:100,plcl:70,pman:200,pnvl:150,prvt:350,rag1:null,rat6:null,rat9:null,rde2:null,rde4:null,rin1:null,rnec:150,rnsp:null,shas:50,shea:250,skul:50,spre:50,spro:150,sreg:100,ssan:250,stel:150,stwp:350,tgrh:600,tret:300,tsct:30,will:null,wneg:200},Ce={Rhpt:[100,100],Rhst:[100,100],Rhme:[125,150,175],Rhar:[125,150,175],Rhra:[125,150,175],Rhri:[75],Rhlh:[100,200],Rhla:[125],Rhde:[150],Rhac:[100],Rhhb:[125],Rhfs:[50],Rhfc:[150],Rhpm:[50],Rhgb:[150],Rhse:[50],Rhfl:[50]},we=Object.entries({YiI0:{label:`Permanent L0`,items:[`rnsp`]},YiI1:{label:`Permanent L1`,items:[`clsd`,`rst1`,`rin1`,`rag1`]},YiI2:{label:`Permanent L2`,items:[`cnob`,`rat6`,`gcel`]},YiI3:{label:`Permanent L3`,items:[`rat9`,`penr`,`prvt`,`rde2`,`rlif`,`evtl`]},YiI4:{label:`Permanent L4`,items:[`afac`,`kpin`,`lhst`,`brac`,`sbch`,`rwiz`]},YiI5:{label:`Permanent L5`,items:[`ajen`,`bgst`,`belv`,`ratc`,`clfm`,`crys`,`hval`,`hcun`,`lgdh`,`mcou`,`ciri`]},YiI6:{label:`Permanent L6`,items:[`spsh`,`desc`,`odef`,`pmna`,`rhth`,`ssil`]},YjI0:{label:`Charged L0`,items:[`vamp`]},YjI1:{label:`Charged L1`,items:[]},YjI2:{label:`Charged L2`,items:[`pnvl`]},YjI3:{label:`Charged L3`,items:[`pghe`,`pnvu`,`pgma`,`pomn`,`sror`]},YjI4:{label:`Charged L4`,items:[`ankh`,`fgsk`,`hlst`,`mnst`]},YjI5:{label:`Charged L5`,items:[`pres`,`sres`,`fgfh`,`fgrg`]},YjI6:{label:`Charged L6`,items:[`wild`,`fgdg`,`shar`]},YkI0:{label:`Power-up L0`,items:[]},YkI1:{label:`Power-up L1`,items:[`manh`,`tdex`,`tint`,`tstr`]},YkI2:{label:`Power-up L2`,items:[]},YkI3:{label:`Power-up L3`,items:[]},YkI5:{label:`Power-up L5`,items:[`tpow`,`tdx2`,`tin2`,`tst2`]}}).reduce((e,[t,n])=>(n.items.forEach(r=>{e[r]={id:t,label:n.label,poolSize:n.items.length}}),e),{}),N=e=>String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#039;`),Te=new Intl.DateTimeFormat(`en`,{month:`short`,day:`numeric`,year:`numeric`}),Ee=[`Echo Isles`,`Terenas Stand`,`Lost Temple`,`Last Refuge`,`Tidehunters`,`Turtle Rock`,`Autumn Leaves`,`Northern Isles`,`Twisted Meadows`,`Hammerfall`],De=e=>String(e||``).toLowerCase().replace(/\([^)]*\)/g,``).replace(/\bv?\d+(?:\.\d+)*\b/g,``).replace(/\blv\b/g,``).replace(/[^a-z]+/g,` `).trim(),Oe=new Set(Ee.map(De)),ke=e=>/\brandom spells\b/i.test(String(e||``)),Ae=e=>Oe.has(De(e))&&!ke(e),je=()=>{let e=window.location.hash.replace(`#/`,``);if(!e)return{type:`all`};if(e===`builds`)return{type:`builds`};if(e===`player-earnings`||e===`human-money`)return{type:`player-earnings`};if(e===`statistics`)return{type:`statistics`};if(e===`resources`)return{type:`resources`};let t=P().find(t=>t.slug===e);return t?{type:`player`,player:t}:{type:`all`}},Me=e=>!e||typeof e!=`string`?e:e.startsWith(`/`)?e.slice(1):e,P=()=>(fe?.players||ce).map(e=>({...e,replayPackUrl:Me(e.replayPackUrl)})),Ne=e=>p?.players?.[e]||{total:0,replays:[]},F=(e,t)=>ue?.players?.[e]?.[t]||null,Pe=e=>{let t=String(e.name||``).toLowerCase(),n=(m?.players||[]).find(e=>String(e.name||``).toLowerCase()===t||String(e.liquipediaId||``).toLowerCase()===t||String(e.page||``).toLowerCase()===t);if(n)return n;let r=m?.featured||{};return r[e.slug]||r[e.name?.toLowerCase()]||null},Fe=e=>{if(!e)return null;let[t,n]=e.split(`:`),r=Ne(t).replays.find(e=>String(e.id)===String(n));if(!r)return null;let i=P().find(e=>e.slug===t);return{...r,sourceSlug:t,sourceName:i?.name||r.sourceName||t,sourceFlag:i?.flag||r.sourceFlag||``}},Ie=e=>String(e||``).replace(/^[a-z]+_/,``),Le=e=>Ie(Se[e]||ae[e]||oe[e]||se[e]||ie[e]||e||`Unknown`),I=e=>`${Le(e)}${e?` (${e})`:``}`,Re=e=>M[e]===null?`Drop / no shop price`:M[e]?`${M[e]} gold`:`Price unknown`,ze=e=>Number.isFinite(M[e]),Be=e=>`${R(e)} gold`,Ve=(e,t=1)=>{let n=Ce[e];return n?n[Math.min(Math.max(t,1),n.length)-1]??null:null},He=e=>{let t={};return e.map(e=>(t[e.id]=(t[e.id]||0)+1,{...e,occurrence:t[e.id],goldCost:Ve(e.id,t[e.id])}))},Ue=(e,t)=>e.reduce((e,n)=>{let r=t(n);return Number.isFinite(r)?e.gold+=r:e.unknown+=1,e},{gold:0,unknown:0}),We=({label:e,gold:t,unknown:n=0})=>{let r=n?` · ${n} unknown`:``;return`<em class="timeline-total">${N(e)}: ${N(Be(t))}${N(r)}</em>`},Ge=e=>{let t=e?.map?.checksumSha1;return t&&de?.maps?.[t]||null},Ke=(e,t)=>{let n=we[e];if(!n)return null;let r=Ge(t),i=r?.dropGroups?.[n.id];if(!i)return null;let a=n.poolSize||0,o=Number.isFinite(i.chance)?i.chance:100;return!a||!o?null:{chance:o/a,groupId:n.id,groupLabel:n.label,poolSize:a,rolls:i.rolls||0,mapFile:r.file}},qe=e=>Number.isFinite(e)?`${e.toFixed(+(e<10))}%`:`unknown`,Je=(e,t)=>{let n=Ke(e,t);return n?`${n.groupLabel} (${n.poolSize} outcomes)`:we[e]?`Drop group known; map table not extracted`:M[e]===null?`Drop group unknown`:`Shop item / drop source unknown`},Ye=(e,t)=>{let n=Ke(e,t);return n?`Chance: ${qe(n.chance)} per ${n.groupLabel} roll`:`Chance: not available`},L=(e,t=I(e))=>{let n=re[e];return n?`<img class="wc3-object-icon" src="${N(Me(n))}" alt="${N(t)}" loading="lazy" />`:`<span class="wc3-object-icon is-empty" aria-hidden="true">${N(String(e||`?`).slice(0,1))}</span>`},Xe=(e,{compact:t=!1}={})=>{let n=typeof e==`string`?e:e?.id;if(!n)return``;let r=typeof e==`string`?null:e?.level,i=Number.isFinite(r)&&r>0?` · L${r}`:``;return`
    <span class="hero-badge ${t?`is-compact`:``}">
      ${L(n)}
      <span>${N(Le(n))}${N(i)}</span>
    </span>
  `},R=e=>Number.isFinite(e)?new Intl.NumberFormat(`en`).format(e):`0`,Ze=e=>{if(!e)return{key:`stream`,label:`Stream`,short:`St`};let t=``;try{t=new URL(e).hostname.toLowerCase()}catch{return{key:`stream`,label:`Stream`,short:`St`}}return t.includes(`twitch.tv`)?{key:`twitch`,label:`Twitch`,short:`Tw`,icon:te}:t.includes(`douyu.com`)?{key:`douyu`,label:`Douyu`,short:`DY`,icon:a}:t.includes(`youtube.com`)||t.includes(`youtu.be`)?{key:`youtube`,label:`YouTube`,short:`YT`}:t.includes(`bilibili.com`)?{key:`bilibili`,label:`Bilibili`,short:`B`}:{key:`stream`,label:`Stream`,short:`St`}},Qe=()=>`
  <span class="service-icon service-icon-download" aria-hidden="true">
    <svg class="action-icon" viewBox="0 0 24 24">
      <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v3h14v-3" />
    </svg>
  </span>
`,$e={house:`<path fill="currentColor" d="M256 19.27L25.637 249.638L19.27 256L32 268.73l6.363-6.367L256 44.727l217.637 217.636L480 268.73l12.73-12.73l-6.367-6.363zM96 48v107.273l64-64.002V48zm160 20.727l-192 192V486h64V320h96v166h224V260.727zM288 320h96v80h-96z"/>`,scroll:`<path fill="currentColor" d="M103.432 17.844a87 87 0 0 0-3.348.08q-3.822.163-7.604.678c-20.167 2.747-39.158 13.667-52.324 33.67c-24.613 37.4 2.194 98.025 56.625 98.025c.536 0 1.058-.012 1.583-.022v.704h60.565c-10.758 31.994-30.298 66.596-52.448 101.43a283 283 0 0 0-6.29 10.406l34.878 35.733l-56.263 9.423c-32.728 85.966-27.42 182.074 48.277 182.074v-.002l9.31.066c23.83-.57 46.732-4.298 61.325-12.887c4.174-2.458 7.63-5.237 10.467-8.42h-32.446c-20.33 5.95-40.8-6.94-47.396-25.922c-8.956-25.77 7.52-52.36 31.867-60.452a55.6 55.6 0 0 1 17.565-2.834v-.406h178.33c-.57-44.403 16.35-90.125 49.184-126c23.955-26.176 42.03-60.624 51.3-94.846l-41.225-24.932l38.272-6.906l-43.37-25.807l52.131-8.85c-5.232-39.134-28.84-68.113-77.37-68.113c-43.878 7.526-162.908 10.556-235.678 3.762c-14.888-6.763-30.547-10.723-45.908-10.652m.464 18.703c13.137.043 27.407 3.804 41.247 10.63l.033-.07c4.667 4.735 8.542 9.737 11.68 14.985H82.92l10.574 14.78c10.608 14.83 19.803 31.99 21.09 42.024c.643 5.017-.11 7.167-1.814 8.836c-1.705 1.67-6.228 3.875-15.99 3.875c-40.587 0-56.878-44.952-41.012-69.06C66.238 46.64 79.582 39.22 95.002 37.12a64 64 0 0 1 8.894-.573M118.5 80.78h46.28c4.275 15.734 3.656 33.07-.544 51.51H131.52c1.9-5.027 2.268-10.574 1.6-15.77c-1.527-11.913-7.405-24.065-14.62-35.74m101.553 317.095c6.44 6.84 11.192 15.31 13.37 24.914c3.797 16.736 3.092 31.208-1.767 43.204c-4.526 11.175-12.576 19.79-22.29 26h237.19c14.448 0 24.887-5.678 32.2-14.318c7.312-8.64 11.2-20.514 10.705-32.352a47.7 47.7 0 0 0-2.407-13.18l-69.91-8.205l42.017-20.528c-8.32-3.442-18.64-5.537-31.375-5.537H220.053zm-42.668.506a37 37 0 0 0-3.457.153a34.8 34.8 0 0 0-7.824 1.63c-15.11 5.02-25.338 21.54-20.11 36.583c3.673 10.57 15.347 17.71 25.654 13.938l1.555-.57h43.354c.946-6.36.754-13.882-1.358-23.192c-3.71-16.358-20.543-28.483-37.815-28.54z"/>`,coins:`<path fill="currentColor" d="M264.4 95.01c-35.6-.06-80.2 11.19-124.2 34.09C96.27 152 61.45 182 41.01 211.3c-20.45 29.2-25.98 56.4-15.92 75.8c10.07 19.3 35.53 30.4 71.22 30.4c35.69.1 80.29-11.2 124.19-34c44-22.9 78.8-53 99.2-82.2c20.5-29.2 25.9-56.4 15.9-75.8c-10.1-19.3-35.5-30.49-71.2-30.49m91.9 70.29c-3.5 15.3-11.1 31-21.8 46.3c-22.6 32.3-59.5 63.8-105.7 87.8c-46.2 24.1-93.1 36.2-132.5 36.2c-18.6 0-35.84-2.8-50.37-8.7l10.59 20.4c10.08 19.4 35.47 30.5 71.18 30.5c35.7 0 80.3-11.2 124.2-34.1c44-22.8 78.8-52.9 99.2-82.2c20.4-29.2 26-56.4 15.9-75.7zm28.8 16.8c11.2 26.7 2.2 59.2-19.2 89.7c-18.9 27.1-47.8 53.4-83.6 75.4c11.1 1.2 22.7 1.8 34.5 1.8c49.5 0 94.3-10.6 125.9-27.1c31.7-16.5 49.1-38.1 49.1-59.9s-17.4-43.4-49.1-59.9c-16.1-8.4-35.7-15.3-57.6-20m106.7 124.8c-10.2 11.9-24.2 22.4-40.7 31c-35 18.2-82.2 29.1-134.3 29.1c-21.2 0-41.6-1.8-60.7-5.2c-23.2 11.7-46.5 20.4-68.9 26.1c1.2.7 2.4 1.3 3.7 2c31.6 16.5 76.4 27.1 125.9 27.1s94.3-10.6 125.9-27.1c31.7-16.5 49.1-38.1 49.1-59.9z"/>`,chart:`<path fill="currentColor" d="M23 23v466h466v-18H41v-82.184l85.854-57.234l70.023 70.022l65.133-260.536L387.28 203.7l67.79-107.97l19.317 11.858l6.102-71.1l-60.644 37.616l19.884 12.207l-59.01 93.99l-130.732-65.366l-62.865 251.462l-57.98-57.978L41 367.184V23z"/>`,crystal:`<path fill="currentColor" d="M254.563 20.75c-42.96 0-85.918 16.387-118.688 49.156c-65.54 65.54-65.852 172.15-.313 237.688c65.54 65.54 172.15 65.226 237.688-.313c65.54-65.538 65.54-171.835 0-237.374c-32.77-32.77-75.728-49.156-118.688-49.156zm-.157 18.47a149.3 149.3 0 0 1 74.313 19.968c-13.573-3.984-26.266-2.455-34.22 5.5c-14.437 14.437-7.796 44.485 14.813 67.093c22.608 22.61 52.625 29.22 67.062 14.782c8.523-8.522 9.706-22.468 4.594-37.125c36.352 57.684 29.586 134.6-20.69 184.875c-29.158 29.16-67.353 43.773-105.56 43.813c9.436-2.3 17.762-6.732 24.436-13.406c28.885-28.886 15.64-88.954-29.594-134.19c-45.234-45.233-105.302-58.51-134.187-29.624c-4.052 4.052-7.266 8.723-9.688 13.875c3.092-33.537 17.473-66.222 43.157-91.905c29.198-29.2 67.384-43.737 105.562-43.656zM386.97 319.28c-.205.206-.39.422-.595.626c-72.78 72.78-191.252 73.155-264.03.375c-.278-.275-.54-.565-.814-.842c-11.987 9.483-18.81 20.384-18.81 32c0 36.523 67.315 66.125 151.343 66.125s152.093-29.6 152.093-66.125c0-11.68-6.97-22.637-19.187-32.157zm39.717 54.564c-22.225 32.29-91.192 55.906-172.625 55.906c-81.172 0-149.954-23.46-172.406-55.594c-12.638 11.3-19.72 24.052-19.72 37.563c.002 46.928 85.546 85.03 192.064 85.03s192.97-38.1 192.97-85.03c0-13.637-7.313-26.498-20.283-37.876z"/>`,castle:`<path fill="currentColor" d="M254.25 15.344c-132.537 0-240.188 107.62-240.188 240.156c0 132.537 107.65 240.188 240.188 240.188S494.406 388.038 494.406 255.5S386.786 15.344 254.25 15.344m0 18.687c122.436 0 221.47 99.034 221.47 221.47c0 65.65-28.465 124.583-73.75 165.125V238.75l14-22.78h-7.595L364 101.5l-43.813 114.47h-8.156l14.595 22.78v33.875h-36.813v-88.188l14.625-22.78h-7.593l-44.406-114.47l-44.375 114.47h-7.594l14.03 22.78v123.22h-37.375v-18.094l14.594-22.782h-8.19l-43.78-114.467L95.344 266.78H87.75l14.03 22.783V416.25C59.25 375.9 32.75 318.83 32.75 255.5c0-122.436 99.064-221.47 221.5-221.47zm1.094 160.532h18.687v36.344h-18.686v-36.344zm110.156 87.97h18.688v36.312H365.5V282.53zm-246.656 22.03h18.687v36.344h-18.686v-36.344zm50.875 29.407h18.686v36.342H169.72V333.97zm170.81 30.5h18.69v36.342h-18.69z"/>`,processor:`<path fill="currentColor" d="M228.844 32.22v114.218h17.687V32.218h-17.686zm-108.25.624c-15.507 0-28.094 12.586-28.094 28.093S105.087 89 120.594 89c12.655 0 23.34-8.372 26.844-19.875h44.937v77.313h17.688v-95H147.03c-3.888-10.837-14.262-18.593-26.436-18.593zm193.25 0c-15.507 0-28.063 12.586-28.063 28.093c0 12.124 7.677 22.45 18.44 26.376v59.124h17.655V87.844c11.596-3.452 20.063-14.193 20.063-26.906c0-15.508-12.587-28.094-28.094-28.094zM266.124 92.5v53.938h17.657V92.5h-17.655zm188.532 4.03c-15.507 0-28.094 12.588-28.094 28.095c0 13.083 8.948 24.074 21.063 27.188v27.468h-92.938v17.657h110.624v-46.342c10.223-4.192 17.407-14.233 17.407-25.97c0-15.507-12.557-28.094-28.064-28.094zM30.187 123.657v17.688H96.75v55.594h62.814V179.28h-45.126v-55.624zm147.032 40.47v159.718h159.81v-159.72H177.22zm17.56 15.655h17.657v78.595l32.407 32.406h75.28v17.658H237.5l-2.594-2.594l-10.75-10.75c-1.033 7.385-7.36 13.062-15.03 13.062c-8.392 0-15.19-6.796-15.19-15.187c0-7.682 5.696-13.98 13.095-15l-9.655-9.658l-2.594-2.593V179.78zm54.94.157h17.686v55.313h52.53l.002 17.688H249.72v-73zM53.124 217.375v89.969c-11.49 3.512-19.844 14.198-19.844 26.844c0 15.505 12.557 28.093 28.064 28.093s28.093-12.587 28.093-28.092c0-12.195-7.79-22.564-18.656-26.438v-72.72h88.782v-17.655H53.124zm301.563 0v17.656h53.968v-17.655h-53.97zm99.968 21.97c-10.898 0-20.342 6.21-25 15.28h-74.97l.002 17.688H427c2.325 13.168 13.824 23.187 27.656 23.187c15.507 0 28.063-12.588 28.063-28.094s-12.557-28.062-28.064-28.062zm-349.062 15.28v17.688h53.97v-17.688zm17.156 36.47v84.217c-11.498 3.513-19.875 14.2-19.875 26.844c0 15.506 12.587 28.094 28.094 28.094c15.506 0 28.06-12.588 28.06-28.094c0-12.194-7.766-22.564-18.624-26.437v-66.94h19.156v-17.686h-36.81zm231.938 0v17.686h45.156v95.283c-11.323 3.624-19.53 14.26-19.53 26.78c-.002 15.506 12.585 28.063 28.092 28.063s28.063-12.557 28.063-28.062c0-12.32-7.935-22.778-18.97-26.563V291.095h-62.814zM192.375 341.53v54.033h17.688V341.53zm36.47 0v86.564c-11.013 3.794-18.94 14.233-18.94 26.53c0 15.506 12.588 28.095 28.095 28.095s28.063-12.59 28.063-28.095c0-12.53-8.203-23.14-19.532-26.75V341.53zm37.28 0v54.033h17.688l-.032-54.032h-17.655zm38.094 0v140.064h17.655V341.53H304.22z"/>`,compass:`<path fill="currentColor" d="m203.97 23l-18.032 4.844l11.656 43.468c-25.837 8.076-50.32 21.653-71.594 40.75L94.53 80.594l-13.218 13.22l31.376 31.374c-19.467 21.125-33.414 45.53-41.813 71.343l-42.313-11.343l-4.843 18.063l42.25 11.313c-6.057 27.3-6.157 55.656-.345 83L23.72 308.78l4.843 18.064l41.812-11.22a193.3 193.3 0 0 0 31.25 59.876l-29.97 52.688l-16.81 29.593l29.56-16.842l52.657-29.97a193.3 193.3 0 0 0 60.094 31.407l-11.22 41.844l18.033 4.81l11.218-41.905a195.7 195.7 0 0 0 83-.375l11.312 42.28l18.063-4.81l-11.344-42.376c25.812-8.4 50.217-22.315 71.342-41.78l31.375 31.373l13.22-13.218l-31.47-31.47a193.3 193.3 0 0 0 40.72-71.563l43.53 11.657l4.813-18.063l-43.625-11.686a195.7 195.7 0 0 0-.344-82.063l43.97-11.78l-4.813-18.063L440.908 197c-6.73-20.866-17.08-40.79-31.032-58.844l29.97-52.656l16.842-29.563l-29.593 16.844l-52.656 29.97c-17.998-13.875-37.874-24.198-58.657-30.906l11.783-44L309.5 23l-11.78 43.97c-27-5.925-55.02-6.05-82.064-.376zm201.56 85L297.25 298.313l-.75.437l-40.844-40.875l-148.72 148.72l-2.186 1.25l109.125-191.75l41.78 41.78L405.532 108zm-149.686 10.594c21.858 0 43.717 5.166 63.594 15.47l-116.625 66.342l-2.22 1.28l-1.28 2.22l-66.25 116.406c-26.942-52.04-18.616-117.603 25.03-161.25c26.99-26.988 62.38-40.468 97.75-40.468zm122.72 74.594c26.994 52.054 18.67 117.672-25.002 161.343c-43.66 43.662-109.263 52.005-161.312 25.033l116.438-66.282l2.25-1.25l1.25-2.25l66.375-116.592z"/>`,search:`<path fill="currentColor" d="M333.78 20.188c-39.97 0-79.96 15.212-110.405 45.656c-58.667 58.667-60.796 152.72-6.406 213.97l-15.782 15.748l13.25 13.25l15.75-15.78c61.248 54.39 155.3 52.26 213.968-6.407c60.887-60.886 60.888-159.894 0-220.78C413.713 35.4 373.753 20.187 333.78 20.187zm0 18.562c35.15 0 70.285 13.44 97.158 40.313c53.745 53.745 53.744 140.6 0 194.343c-51.526 51.526-133.46 53.643-187.5 6.375l.218-.217c-2.35-2.05-4.668-4.17-6.906-6.407c-2.207-2.206-4.288-4.496-6.313-6.812l-.218.22c-47.27-54.04-45.152-135.976 6.374-187.502C263.467 52.19 298.63 38.75 333.78 38.75m0 18.813c-30.31 0-60.63 11.6-83.81 34.78c-46.362 46.362-46.362 121.234 0 167.594c10.14 10.142 21.632 18.077 33.905 23.782c-24.91-19.087-40.97-49.133-40.97-82.94c0-15.323 3.292-29.888 9.22-43c-4.165 20.485.44 40.88 14.47 54.907c24.583 24.585 68.744 20.318 98.624-9.562s34.146-74.04 9.56-98.625a52.4 52.4 0 0 0-7.655-6.313c45.13 8.648 79.954 46.345 84.25 92.876c4.44-35.07-6.82-71.726-33.813-98.72c-23.18-23.18-53.47-34.78-83.78-34.78zM176.907 297.688L42.094 432.5l34.562 34.563L211.47 332.25zM40 456.813L24 472.78L37.22 486l15.968-16z"/>`},z=(e,t=``)=>`
  <svg class="game-icon ${t}" viewBox="0 0 512 512" aria-hidden="true" focusable="false">
    ${$e[e]||$e.crystal}
  </svg>
`,B=()=>`
  <span class="analyze-icon" aria-hidden="true">
    ${z(`search`)}
  </span>
`,et=({key:e,short:t,icon:n},r)=>`
  <span class="service-icon service-icon-${N(e)}" aria-hidden="true">
    ${n?`<img src="${n}" alt="" loading="lazy" />`:N(t)}
  </span>
  <span class="action-label">${N(r)}</span>
`,tt=e=>{if(!e.streamUrl)return`<span class="is-disabled"><span class="service-icon service-icon-stream" aria-hidden="true">St</span><span class="action-label">Stream</span></span>`;let t=Ze(e.streamUrl);return`
    <a href="${N(e.streamUrl)}" target="_blank" rel="noreferrer" aria-label="Open ${N(e.name)} ${N(t.label)} stream">
      ${et(t,t.label)}
    </a>
  `},nt=e=>e.liquipediaUrl?`
    <a href="${N(e.liquipediaUrl)}" target="_blank" rel="noreferrer" aria-label="Open ${N(e.name)} on Liquipedia">
      ${et({key:`liquipedia`,short:`LP`,icon:f},`Liquipedia`)}
    </a>
  `:`<span class="is-disabled"><span class="service-icon service-icon-liquipedia" aria-hidden="true"><img src="${f}" alt="" loading="lazy" /></span><span class="action-label">Liquipedia</span></span>`,rt=e=>e.realName?`<p class="player-card-real-name">${N(e.realName)}</p>`:``,it=e=>{let t={chaemiko:i,fortitude:s,hawk:c,infi:u,leon:d,sok:ee}[e.slug];return t?`<img class="player-card-image" src="${t}" alt="${N(e.name)}" loading="lazy" />`:`<span>${N(e.flag)}</span>`},at=e=>e.slug===`infi`?`
    <video class="player-card-effect player-card-fireball" autoplay loop muted playsinline preload="metadata" aria-hidden="true">
      <source src="${o}" type="video/webm" />
    </video>
  `:``,V=()=>p?P().flatMap(e=>Ne(e.slug).replays.filter(e=>Ae(e.map)).map(t=>({...t,sourceSlug:e.slug,sourceName:e.name,sourceFlag:e.flag}))):[],ot=()=>[...new Set(V().map(e=>e.map).filter(Boolean))].sort((e,t)=>e.localeCompare(t)),H=e=>({h:`Human`,human:`Human`,o:`Orc`,orc:`Orc`,u:`Undead`,undead:`Undead`,n:`Night Elf`,nightelf:`Night Elf`})[String(e||``).toLowerCase().replaceAll(` `,``).replaceAll(`_`,``).replaceAll(`-`,``)]||e||`Unknown`,st=e=>(e.players||[]).find(t=>t.name?.toLowerCase()===e.sourceName?.toLowerCase())||e.players?.[0]||null,ct=e=>{let t=st(e);return t?[t,...(e.players||[]).filter(e=>e!==t)]:e.players||[]},lt=e=>{let t=ct(e);return t.length<2?``:`${H(t[0].race)} vs ${H(t[1].race)}`},ut=()=>[...new Set(V().map(lt).filter(Boolean))].sort((e,t)=>!e.startsWith(`Human vs`)-+!t.startsWith(`Human vs`)||e.localeCompare(t)),dt=e=>F(e.sourceSlug,e.id),U=[`Hamg`,`Hmkg`,`Hpal`,`Hblm`],ft=e=>H(e?.raceDetected||e?.race)===`Human`,W=(e,t,n=1)=>{!t||!Number.isFinite(n)||e.set(t,(e.get(t)||0)+n)},pt=(e,t=[])=>{t.forEach(t=>W(e,t.id,Number(t.count)||0))},G=(e,t=8)=>[...e.entries()].filter(([,e])=>e>0).sort((e,t)=>t[1]-e[1]||I(e[0]).localeCompare(I(t[0]))).slice(0,t),mt=()=>{let e=new Map(U.map(e=>[e,0])),t=new Map(U.map(e=>[e,0])),n=new Map,r=new Map,i=new Map,a=new Map,o=new Map,s=new Map,c=new Map,l=0,u=0,d=0,f=0,ee=0,te=0,ne=0;return V().forEach(re=>{let ie=F(re.sourceSlug,re.id);if(ie?.status!==`parsed`)return;u+=1;let ae=(ie.players||[]).filter(ft);ae.length&&(W(s,re.map||ie.map?.name||`Unknown map`),W(c,lt(re)||`Unknown matchup`),ae.forEach(s=>{l+=1,Number.isFinite(s.apm)&&(d+=s.apm,f+=1),ee+=s.actions?.item||0;let c=s.heroes||[];c.forEach(t=>{U.includes(t.id)&&W(e,t.id)}),U.includes(c[0]?.id)&&W(t,c[0].id),(s.order?.items||[]).forEach(e=>{ze(e.id)?(W(n,e.id),te+=M[e.id]||0):(W(r,e.id),M[e.id]!==null&&(ne+=1))}),pt(i,s.topUnits),pt(a,s.topBuildings),(s.order?.upgrades||[]).forEach(e=>W(o,e.id))}))}),{heroPicks:e,firstHeroPicks:t,boughtItems:n,foundItems:r,unitCounts:i,buildingCounts:a,upgradeCounts:o,mapCounts:s,matchupCounts:c,humanGames:l,parsedReplays:u,averageApm:f?Math.round(d/f):0,totalItemActions:ee,knownBoughtGold:te,unknownBoughtPrices:ne}},ht=e=>(dt(e)?.players||[]).map(e=>e.heroes?.[0]?.id).filter(Boolean),gt=()=>{let e=new Map;return V().forEach(t=>{ht(t).forEach(t=>{e.has(t)||e.set(t,Le(t))})}),[...e.entries()].sort(([,e],[,t])=>e.localeCompare(t)).map(([e,t])=>({value:e,label:t,iconId:e}))},_t=e=>ct(e).map(e=>`${e.name}${e.race?` (${e.race})`:``}`).join(` vs `),vt=e=>{let i=String(e||``).toLowerCase().replaceAll(` `,``).replaceAll(`_`,``).replaceAll(`-`,``),a={h:t,human:t,o:r,orc:r,u:ne,undead:ne,n,nightelf:n};return a[i]?a[i]:null},yt=(e,t,n)=>{if(!n.length)return null;let r=n.find(t=>t.name?.toLowerCase()===e.name?.toLowerCase());if(r)return r;let i=n.filter(t=>H(t.race||t.raceDetected)===H(e.race));return i.length===1?i[0]:n[t]||null},bt=e=>{if(!e)return``;let t=e.name||`Unknown`,n=e.apm?`${e.apm} APM`:`APM unavailable`,r=(e.heroes||[]).slice(0,3);return`
    <span class="matchup-tooltip" role="tooltip">
      <span>${N(t)}</span>
      <strong>${N(n)}</strong>
      ${r.length?`<span class="matchup-tooltip-heroes">${r.map(e=>Xe(e,{compact:!0})).join(``)}</span>`:``}
    </span>
  `},K=(e,t=[])=>ct(e).map((e,n)=>{let r=vt(e.race),i=yt(e,n,t);return`
        <span class="matchup-player" tabindex="0">
          ${r?`<img src="${r}" alt="${N(e.race)}" loading="lazy" />`:``}
          <span>${N(e.name)}</span>
          ${bt(i)}
        </span>
      `}).join(`<span class="versus">vs</span>`),q=(e,t)=>`
  <div class="analysis-pill">
    <span>${N(e)}</span>
    <strong>${N(t??`Unknown`)}</strong>
  </div>
`,xt=(e,t)=>!t||t.status!==`parsed`?`
      <div class="analysis-empty">
        <strong>Analysis unavailable</strong>
        <span>${N(t?.reason||`Run npm run analyze:replays to parse this replay.`)}</span>
      </div>
    `:`
    <div class="analysis-overview">
      <div class="analysis-pill-grid">
        ${q(`Map`,e.map)}
        ${q(`Duration`,t.durationLabel)}
        ${q(`Matchup`,t.matchup)}
        ${q(`Patch`,t.version)}
        ${q(`Game`,t.gameName)}
        ${q(`Chat`,`${t.chatCount||0} messages`)}
      </div>
      <div class="analysis-player-grid">
        ${(t.players||[]).map(e=>`
              <div class="analysis-player-card">
                <span class="analysis-player-meta">${N(e.raceDetected||e.race||`Unknown race`)}</span>
                <strong>${N(e.name||`Unknown`)}</strong>
                <div class="analysis-stat-line">
                  <span>${N(e.apm||0)} APM</span>
                  <span>${N(e.heroCount||0)} heroes</span>
                </div>
                <div class="analysis-heroes">
                  ${(e.heroes||[]).map(e=>Xe(e)).join(``)}
                </div>
              </div>
            `).join(``)}
      </div>
    </div>
  `,St=e=>{let t=(e?.players||[]).map(e=>({...e,chartApmTimeline:(e.apmTimeline||[]).slice(1,-1)})),n=Math.max(...t.flatMap(e=>e.chartApmTimeline||[]),1);if(!t.some(e=>e.chartApmTimeline?.length))return`<div class="analysis-empty"><strong>No APM timeline</strong><span>Run the updated replay analyzer to generate APM buckets.</span></div>`;let r={top:26,right:28,bottom:36,left:44},i=720-r.left-r.right,a=280-r.top-r.bottom,o=Math.max(100,Math.ceil(n/50)*50),s=Math.max(...t.map(e=>e.chartApmTimeline?.length||0),1),c=(e,t,n)=>({x:r.left+(n<=1?i/2:t/(n-1)*i),y:r.top+a-Math.min(e,o)/o*a}),l=e=>e.length?e.length===1?`M ${e[0].x} ${e[0].y}`:e.reduce((t,n,r)=>{if(r===0)return`M ${n.x} ${n.y}`;let i=e[r-1],a=(i.x+n.x)/2,o=(i.y+n.y)/2;return`${t} Q ${i.x} ${i.y} ${a} ${o}`},``)+` T ${e[e.length-1].x} ${e[e.length-1].y}`:``,u=[o,Math.round(o*.75),Math.round(o*.5),Math.round(o*.25),0],d=[0,Math.floor((s-1)/2),s-1].filter((e,t,n)=>n.indexOf(e)===t);return`
    <div class="apm-chart">
      <div class="apm-chart-header">
        <div>
          <strong>APM Flow</strong>
          <span>Action pressure over time</span>
        </div>
        <div class="apm-legend">
          ${t.map((e,t)=>`
                <span class="apm-legend-item apm-series-${t+1}">
                  <i aria-hidden="true"></i>
                  ${N(e.name||`Unknown`)} · ${N(e.apm||0)} avg
                </span>
              `).join(``)}
        </div>
      </div>
      <div class="apm-line-chart">
        <svg viewBox="0 0 720 280" role="img" aria-label="APM line chart comparing players over time" preserveAspectRatio="none">
          <defs>
            <linearGradient id="apm-series-gradient-1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#48A0C7" />
              <stop offset="100%" stop-color="#E8F8FF" />
            </linearGradient>
            <linearGradient id="apm-series-gradient-2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#F4C76A" />
              <stop offset="100%" stop-color="#FFF3BF" />
            </linearGradient>
            <filter id="apm-glow" x="-25%" y="-80%" width="150%" height="260%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          ${u.map(e=>{let t=r.top+a-e/o*a;return`
                <g class="apm-grid-line">
                  <line x1="${r.left}" y1="${t}" x2="${720-r.right}" y2="${t}" />
                  <text x="${r.left-12}" y="${t+4}">${e}</text>
                </g>
              `}).join(``)}
          ${d.map(e=>`<text class="apm-time-label" x="${r.left+(s<=1?i/2:e/(s-1)*i)}" y="270">${e===0?`Start`:`${e}m`}</text>`).join(``)}
          ${t.map((e,t)=>{let n=e.chartApmTimeline||[],r=n.map((e,t)=>c(Number(e)||0,t,n.length)),i=l(r);return`
                <g class="apm-series apm-series-${t+1}">
                  <path class="apm-line apm-line-glow" d="${i}" />
                  <path class="apm-line" d="${i}" />
                  ${r.map((t,r)=>`
                        <circle class="apm-point" cx="${t.x}" cy="${t.y}" r="3.2">
                          <title>${N(e.name||`Player`)} · ${N(n[r])} APM · ${r}m</title>
                        </circle>
                      `).join(``)}
                </g>
              `}).join(``)}
        </svg>
      </div>
      <div class="apm-summary-grid">
        ${t.map(e=>`
            <div class="apm-summary-card">
              <span>${N(e.name||`Unknown`)}</span>
              <strong>${N(e.apm||0)} APM</strong>
              <em>Peak ${N(Math.max(...e.chartApmTimeline||[0]))} · Low ${N(Math.min(...e.chartApmTimeline||[0]))}</em>
            </div>
          `).join(``)}
      </div>
    </div>
  `},Ct=(e,t)=>t.flatMap(([t,n])=>(n||[]).map(n=>({...n,type:t,playerName:e.name,race:e.raceDetected||e.race}))).sort((e,t)=>(e.ms||0)-(t.ms||0)),wt=(e,t=`${e.type}`)=>`
  <div class="build-order-row">
    <span>${N(e.time||`0:00`)}</span>
    <div class="timeline-object">
      ${L(e.id)}
      <strong>${N(I(e.id))}</strong>
    </div>
    <em>${N(t)}</em>
  </div>
`,Tt=(e,t)=>`
  <div class="build-order-row item-found-row">
    <span>${N(e.time||`0:00`)}</span>
    <div class="timeline-object">
      ${L(e.id)}
      <strong>${N(I(e.id))}</strong>
    </div>
    <em>
      <span>Found / dropped</span>
      <small>${N(Je(e.id,t))}</small>
      <small>${N(Ye(e.id,t))}</small>
    </em>
  </div>
`,Et=({analysis:e,title:t,emptyMessage:n,getItems:r,renderRow:i=wt,renderSummary:a=null})=>{let o=e?.players||[];return o.some(e=>r(e).length)?`
    <div class="timeline-columns">
      ${o.map(e=>{let t=r(e),n=a?a(e,t):``;return`
            <section class="timeline-player-column">
              <header>
                <span>${N(e.raceDetected||e.race||`Unknown race`)}</span>
                <strong>${N(e.name||`Unknown`)}</strong>
                ${n}
              </header>
              <div class="build-order-list">
                ${t.length?t.map(i).join(``):`<div class="timeline-empty">No entries parsed</div>`}
              </div>
            </section>
          `}).join(``)}
    </div>
  `:`<div class="analysis-empty"><strong>${N(t)} unavailable</strong><span>${N(n)}</span></div>`},Dt=e=>Et({analysis:e,title:`Build order`,emptyMessage:`Run the updated replay analyzer to generate unit and building timeline data.`,getItems:e=>Ct(e,[[`Building`,e.order?.buildings],[`Unit`,e.order?.units]])}),Ot=e=>Et({analysis:e,title:`Upgrades`,emptyMessage:`No upgrades were parsed for this replay.`,getItems:e=>He(Ct(e,[[`Upgrade`,e.order?.upgrades]])),renderRow:e=>wt(e,Number.isFinite(e.goldCost)?Be(e.goldCost):`Cost unknown`),renderSummary:(e,t)=>{let n=Ue(t,e=>e.goldCost);return We({label:`Known gold spent`,gold:n.gold,unknown:n.unknown})}}),kt=e=>Et({analysis:e,title:`Items bought`,emptyMessage:`No shop-price items were parsed for this replay.`,getItems:e=>Ct(e,[[`Item`,e.order?.items]]).filter(e=>ze(e.id)),renderSummary:(e,t)=>{let n=Ue(t,e=>M[e.id]);return We({label:`Total spent`,gold:n.gold,unknown:n.unknown})},renderRow:t=>{let n=Ke(t.id,e);return wt(t,n?`${Re(t.id)} · ${qe(n.chance)} ${n.groupLabel} drop`:Re(t.id))}}),At=e=>Et({analysis:e,title:`Items found`,emptyMessage:`No no-shop-price items were parsed for this replay.`,getItems:e=>Ct(e,[[`Item`,e.order?.items]]).filter(e=>!ze(e.id)),renderRow:t=>Tt(t,e)}),jt=e=>{let t=e?.chat||[];return t.length?`
    <div class="chatlog-list">
      ${t.map(e=>`
            <div class="chatlog-row">
              <span>${N(e.time||`0:00`)}</span>
              <strong>${N(e.playerName||`Unknown`)}</strong>
              <p>${N(e.message||``)}</p>
            </div>
          `).join(``)}
    </div>
  `:`<div class="analysis-empty"><strong>No chat messages</strong><span>This replay has no parsed player chat.</span></div>`},Mt=(e=[])=>e.length?e.map(e=>`<span>${N(I(e.id))} × ${N(e.count)}</span>`).join(``):`<span>None parsed</span>`,Nt=e=>{let t=e?.players||[];return t.length?`
    <div class="actions-grid">
      ${t.map(e=>`
            <div class="actions-card">
              <strong>${N(e.name||`Unknown`)}</strong>
              <div class="action-counts">
                ${Object.entries(e.actions||{}).map(([e,t])=>`<span><em>${N(e)}</em>${N(R(t||0))}</span>`).join(``)}
              </div>
              <div class="analysis-list-block">
                <small>Top Units</small>
                ${Mt(e.topUnits)}
              </div>
              <div class="analysis-list-block">
                <small>Top Buildings</small>
                ${Mt(e.topBuildings)}
              </div>
              <div class="analysis-list-block">
                <small>Top Items</small>
                ${Mt(e.topItems)}
              </div>
            </div>
          `).join(``)}
    </div>
  `:`<div class="analysis-empty"><strong>No action data</strong><span>Run the updated replay analyzer to generate action data.</span></div>`},Pt=(e,t)=>T===`apm`?St(t):T===`build`?Dt(t):T===`upgrades`?Ot(t):T===`items-bought`?kt(t):T===`items-found`?At(t):T===`chat`?jt(t):T===`actions`?Nt(t):xt(e,t),Ft=()=>{let e=Fe(b);if(!e)return``;let t=F(e.sourceSlug,e.id),n=t?.status===`parsed`?t.players:[],r=be.some(e=>e.id===T)?T:`overview`;return`
    <div class="analysis-modal-shell" role="presentation" data-modal-close>
      <section class="analysis-modal" role="dialog" aria-modal="true" aria-label="Replay analysis">
        <header class="analysis-modal-header">
          <div>
            <span>${N(e.sourceFlag)} ${N(e.sourceName)}</span>
            <h2>${N(e.map)}</h2>
            <div class="analysis-modal-matchup">${K(e,n)}</div>
          </div>
          <button class="analysis-close" type="button" aria-label="Close replay analysis" data-modal-close>×</button>
        </header>
        <nav class="analysis-tabs" aria-label="Replay analysis tabs">
          ${be.map(e=>`
                <button class="${e.id===r?`is-active`:``}" type="button" data-analysis-tab="${N(e.id)}">
                  ${N(e.label)}
                </button>
              `).join(``)}
        </nav>
        <div class="analysis-modal-body">
          ${Pt(e,{...t,players:n})}
        </div>
      </section>
    </div>
  `},J=(e=0)=>{let t=Math.max(0,Math.floor(Number(e||0)/1e3)),n=Math.floor(t/60),r=t%60;return`${n}:${String(r).padStart(2,`0`)}`},It=e=>{if(!e||e.status!==`parsed`)return[];let t=(e.players||[]).flatMap(e=>[...(e.heroes||[]).map(t=>({id:t.id,ms:0,time:`0:00`,type:`Hero`,playerName:e.name,race:e.raceDetected||e.race,detail:t.level?`Level ${t.level}`:`Hero`})),...Ct(e,[[`Building`,e.order?.buildings],[`Unit`,e.order?.units],[`Upgrade`,He(e.order?.upgrades||[])],[`Item`,e.order?.items]]).map(t=>({...t,playerName:e.name,detail:t.type===`Item`?Re(t.id):t.type===`Upgrade`&&Number.isFinite(t.goldCost)?Be(t.goldCost):t.type}))]),n=(e.chat||[]).map(e=>({id:`chat`,ms:e.timeMS||0,time:e.time||J(e.timeMS||0),type:`Chat`,playerName:e.playerName||`Observer`,detail:e.message||``}));return[...t,...n].sort((e,t)=>(e.ms||0)-(t.ms||0))},Lt=()=>{x=null,S=!1,C=0,w&&=(clearInterval(w),null),Q()},Rt=e=>{x=e,C=0,S=!1,w&&=(clearInterval(w),null),Q()},zt=()=>{let e=Fe(x),t=(e?F(e.sourceSlug,e.id):null)?.duration||0;if(S=!S,w&&=(clearInterval(w),null),!S){Q();return}w=setInterval(()=>{C+=1e3,t&&C>=t&&(C=t,S=!1,clearInterval(w),w=null),Q()},1e3),Q()},Bt=()=>{let e=Fe(x);if(!e)return``;let t=F(e.sourceSlug,e.id),n=t?.status===`parsed`?t.players:[],r=It(t),i=t?.duration||e.duration||Math.max(...r.map(e=>e.ms||0),0),a=i?Math.min(100,Math.max(0,C/i*100)):0,o=r.filter(e=>(e.ms||0)<=C).slice(-18),s=r.filter(e=>(e.ms||0)>C).slice(0,18);return`
    <div class="replay-theater-shell" role="presentation" data-theater-close>
      <section class="replay-theater" role="dialog" aria-modal="true" aria-label="Replay theater">
        <header class="replay-theater-header">
          <div>
            <p class="eyebrow">Replay Theater Bridge</p>
            <h2>${N(e.sourceFlag)} ${N(e.sourceName)} on ${N(e.map)}</h2>
            <div class="analysis-modal-matchup">${K(e,n)}</div>
          </div>
          <button class="analysis-close" type="button" aria-label="Close replay theater" data-theater-close>×</button>
        </header>
        <div class="replay-theater-body">
          <section class="replay-theater-map">
            ${e.mapImage?.localPath?`<img src="${N(Me(e.mapImage.localPath))}" alt="${N(e.map)} map thumbnail" />`:`<div class="map-placeholder" aria-hidden="true">${N(e.mapShort||`WC3`)}</div>`}
            <div class="replay-theater-map-overlay">
              <span>${N(t?.version?`Patch ${t.version}`:e.version||`Patch unknown`)}</span>
              <strong>${N(t?.durationLabel||e.durationLabel||J(i))}</strong>
              <small>${N(e.localPath||t?.sourceFile||``)}</small>
            </div>
          </section>
          <section class="replay-theater-controls">
            <div class="replay-theater-clock">
              <strong>${N(J(C))}</strong>
              <span>${N(t?.durationLabel||J(i))}</span>
            </div>
            <div class="replay-theater-progress" aria-label="Replay progress">
              <span style="width: ${a.toFixed(2)}%;"></span>
            </div>
            <div class="replay-theater-buttons">
              <button type="button" data-theater-play>${S?`Pause`:`Play parsed timeline`}</button>
              <button type="button" data-theater-reset>Restart</button>
              <button class="replay-analysis-button" type="button" data-replay-detail="${N(`${e.sourceSlug}:${e.id}`)}">Open Analysis Tabs</button>
            </div>
          </section>
          <div class="replay-theater-columns">
            <section>
              <h3>Played</h3>
              <div class="replay-theater-event-list">
                ${o.length?o.map(Vt).join(``):`<div class="timeline-empty">Press play to advance the parsed replay timeline.</div>`}
              </div>
            </section>
            <section>
              <h3>Next Events</h3>
              <div class="replay-theater-event-list">
                ${s.length?s.map(Vt).join(``):`<div class="timeline-empty">No more parsed events.</div>`}
              </div>
            </section>
          </div>
        </div>
        <footer class="replay-theater-note">
          This is the first replay bridge: parsed replay events with scrub-style playback. Full in-engine camera/unit simulation still needs the Warsmash command playback bridge.
        </footer>
      </section>
    </div>
  `},Vt=e=>`
  <div class="replay-theater-event">
    <span>${N(e.time||J(e.ms||0))}</span>
    <div>
      <strong>${N(e.type===`Chat`?e.playerName:I(e.id))}</strong>
      <small>${N(e.type===`Chat`?e.detail:`${e.playerName||`Player`} · ${e.detail||e.type}`)}</small>
    </div>
  </div>
`,Ht=e=>pe?[e.map,e.mapShort,e.type,e.origin,e.filetype,e.version,_t(e)].filter(Boolean).join(` `).toLowerCase().includes(pe.toLowerCase()):!0,Ut=e=>{let t=h===`all`||e.sourceSlug===h,n=g===`all`||e.map===g,r=_===`all`||ht(e).includes(_),i=v===`all`||lt(e)===v;return t&&n&&r&&i&&Ht(e)},Wt=()=>V().filter(Ut).sort((e,t)=>new Date(t.createdAt||0)-new Date(e.createdAt||0)),Gt=e=>{y=Math.min(Math.max(y,1),Math.max(e,1))},Kt=(e,t)=>{let n=new Set([1,t]);for(let r=e-2;r<=e+2;r+=1)r>=1&&r<=t&&n.add(r);return[...n].sort((e,t)=>e-t)},qt=(e,t)=>{if(t<=1)return`<div class="replay-pagination is-simple"><span>${e} replay${e===1?``:`s`}</span></div>`;let n=(y-1)*ye+1,r=Math.min(y*ye,e),i=Kt(y,t),a=0;return`
    <nav class="replay-pagination" aria-label="Replay pagination">
      <span class="pagination-summary">${n}-${r} of ${e}</span>
      <div class="pagination-controls">
        <button class="pagination-button" type="button" data-page="${y-1}" ${y===1?`disabled`:``}>Prev</button>
        ${i.map(e=>{let t=a&&e-a>1?`<span class="pagination-gap">...</span>`:``;return a=e,`${t}<button class="pagination-button ${e===y?`is-active`:``}" type="button" data-page="${e}" ${e===y?`aria-current="page"`:``}>${e}</button>`}).join(``)}
        <button class="pagination-button" type="button" data-page="${y+1}" ${y===t?`disabled`:``}>Next</button>
      </div>
    </nav>
  `},Jt=e=>le?`
      <div class="empty-state">
        <strong>Replay cache unavailable</strong>
        <span>${N(le)}</span>
      </div>
    `:p?e.length?e.map(e=>{let t=e.createdAt?Te.format(new Date(e.createdAt)):`Unknown date`,n=F(e.sourceSlug,e.id),r=n?.status===`parsed`?n.players:[],i=n?.durationLabel||e.durationLabel;return`
        <article class="replay-row" data-replay-detail="${N(`${e.sourceSlug}:${e.id}`)}" role="button" tabindex="0" aria-label="Analyze ${N(e.map)} replay">
          <div class="replay-map">
            ${e.mapImage?.localPath?`<img src="${N(Me(e.mapImage.localPath))}" alt="${N(e.map)} map thumbnail" loading="lazy" />`:`<div class="map-placeholder" aria-hidden="true">${N(e.mapShort||`WC3`)}</div>`}
            <div>
              <span>${N(t)}</span>
              <strong>${N(e.map)}</strong>
              <small>${N(e.sourceFlag)} ${N(e.sourceName)}</small>
            </div>
          </div>
          <div class="replay-match">
            <div class="replay-matchup">${K(e,r)}</div>
            <div class="replay-actions">
              ${i?`<span class="replay-duration">${N(i)}</span>`:``}
              <a href="${e.downloadUrl}" target="_blank" rel="noreferrer">Download</a>
            </div>
          </div>
          <button class="replay-analysis-button" type="button" data-replay-detail="${N(`${e.sourceSlug}:${e.id}`)}">
            ${B()}
            <span>Analyze</span>
          </button>
        </article>
      `}).join(``):`
      <div class="empty-state">
        <strong>No matching replays</strong>
        <span>Try another map, player, race, or search term.</span>
      </div>
    `:`
      <div class="empty-state">
        <strong>Loading replay cache</strong>
        <span>Reading local data from public/replays.json</span>
      </div>
    `,Yt=()=>{if(le||!p)return`
      <section class="replay-list" aria-label="Recent replay rows">
        ${Jt([])}
      </section>
    `;let e=Wt(),t=Math.ceil(e.length/ye);Gt(t);let n=(y-1)*ye;return`
    <section class="replay-list" aria-label="Recent replay rows">
      ${Jt(e.slice(n,n+ye))}
    </section>
    ${e.length?qt(e.length,Math.max(t,1)):``}
  `},Xt=(e=``)=>`
  <a class="${e}" href="#/" data-page-link>
    ${z(`house`)}
    <span>Home</span>
  </a>
`,Zt=(e=``)=>`
  <span class="${e} is-disabled" aria-disabled="true">
    ${z(`scroll`)}
    <span>Builds</span>
    <small>Coming soon</small>
  </span>
`,Qt=(e=``)=>`
  <a class="${e}" href="#/player-earnings" data-page-link>
    ${z(`coins`)}
    <span>Player Earnings</span>
  </a>
`,$t=(e=``)=>`
  <a class="${e}" href="#/statistics" data-page-link>
    ${z(`chart`)}
    <span>Statistics</span>
  </a>
`,en=(e=``)=>`
  <a class="${e}" href="#/resources" data-page-link>
    ${z(`compass`)}
    <span>Resources</span>
  </a>
`,tn=({id:e,label:t,value:n,options:r})=>{let i=r.find(e=>e.value===n)||r[0];return`
    <div class="filter-control dropdown-filter" data-filter="${N(e)}">
      <span class="filter-label" id="${N(e)}-label">${N(t)}</span>
      <button class="filter-dropdown-button" id="${N(e)}" type="button" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="${N(e)}-label ${N(e)}">
        <span>${i.iconId?L(i.iconId,i.label):``}${N(i.label)}</span>
        <span class="dropdown-chevron" aria-hidden="true"></span>
      </button>
      <div class="filter-dropdown-menu" role="listbox" aria-labelledby="${N(e)}-label">
        ${r.map(e=>`
              <button class="filter-dropdown-option ${e.value===n?`is-selected`:``}" type="button" role="option" aria-selected="${e.value===n}" data-value="${N(e.value)}">
                <span>${e.iconId?L(e.iconId,e.label):``}${N(e.label)}</span>
              </button>
            `).join(``)}
      </div>
    </div>
  `},nn=()=>`
  <section class="filters" aria-label="Replay filters">
    <div class="quick-filter">
      <label for="replay-search">Search replays</label>
      <input id="replay-search" type="search" value="${N(pe)}" placeholder="Search map, opponent, patch..." />
    </div>
    <div class="filter-popover">
      <button class="filters-toggle" type="button" aria-expanded="false" aria-controls="advanced-filters">
        <span>Filters</span>
        <span class="dropdown-chevron" aria-hidden="true"></span>
      </button>
      <div class="filter-popover-panel" id="advanced-filters">
        ${tn({id:`map-filter`,label:`Map`,value:g,options:[{value:`all`,label:`All maps`},...ot().map(e=>({value:e,label:e}))]})}
        ${tn({id:`hero-filter`,label:`Starting hero`,value:_,options:[{value:`all`,label:`All heroes`},...gt()]})}
        ${tn({id:`matchup-filter`,label:`Matchup`,value:v,options:[{value:`all`,label:`All matchups`},...ut().map(e=>({value:e,label:e}))]})}
      </div>
    </div>
  </section>
`,rn=e=>{if(!e.streamUrl)return`<span class="ranking-stream is-empty" aria-hidden="true"></span>`;let t=Ze(e.streamUrl);return`
    <a class="ranking-stream" href="${N(e.streamUrl)}" target="_blank" rel="noreferrer" aria-label="Open ${N(e.name)} ${N(t.label)} stream">
      <span class="service-icon service-icon-${N(t.key)}" aria-hidden="true">
        ${t.icon?`<img src="${t.icon}" alt="" loading="lazy" />`:N(t.short)}
      </span>
    </a>
  `},an=()=>`
  <aside class="rankings-sidebar" aria-label="Human rankings">
    <div class="rankings-header">
      <span>WC3 HU Rankings</span>
      <small>Top ${P().length}</small>
    </div>
    <div class="rankings-list">
      ${P().map(e=>`
            <div class="ranking-row ${h===e.slug?`is-selected`:``}" data-player-filter="${N(e.slug)}" role="button" tabindex="0" aria-pressed="${h===e.slug}">
              <span class="ranking-rank">#${e.rank}</span>
              <span class="ranking-player">
                <span aria-hidden="true">${e.flag}</span>
                <strong>${N(e.name)}</strong>
              </span>
              <span class="ranking-elo">${e.elo}</span>
              ${rn(e)}
            </div>
          `).join(``)}
    </div>
  </aside>
`,on=e=>e?`
    <svg class="medal-border" aria-hidden="true" focusable="false">
      <rect class="medal-border-glow" x="0" y="0" width="100%" height="100%" rx="6" ry="6" pathLength="1" />
      <rect class="medal-border-line" x="0" y="0" width="100%" height="100%" rx="6" ry="6" pathLength="1" />
    </svg>
  `:``,sn=()=>`
  <section class="player-card-region ${he?``:`with-card-intro`}" aria-label="Top Human player cards">
    <div class="player-card-strip">
      ${P().map((e,t)=>{let n=[`is-gold`,`is-silver`,`is-bronze`][t]||``,r=t*760,i=t<3?r+520:0,a=Pe(e);return`
            <article class="player-card ${n}" style="--card-delay: ${r}ms; --border-delay: ${i}ms;">
              ${on(n)}
              <div class="player-card-portrait ${[`chaemiko`,`fortitude`,`hawk`,`infi`,`leon`,`sok`].includes(e.slug)?`has-player-image`:``}">
                ${it(e)}
                ${at(e)}
              </div>
              <div class="player-card-body">
                <div class="player-card-summary">
                  <span class="player-card-rank">#${e.rank} · ${e.elo} Elo</span>
                  <h2 class="player-card-name">
                    <span aria-hidden="true">${N(e.flag)}</span>
                    <span>${N(e.name)}</span>
                  </h2>
                  ${a?`<p class="player-card-earnings">${N(a.earningsLabel)}</p>`:``}
                  ${rt(e)}
                </div>
                <div class="player-card-actions">
                  ${tt(e)}
                  ${nt(e)}
                  <a class="download-pack" href="${N(e.replayPackUrl||`replay-packs/${e.slug}-2026-human-wins.zip`)}" download aria-label="Download ${N(e.name)} 2026 Human wins replay pack">
                    ${Qe()}
                    <span class="action-label download-pack-label">
                      <span>Download Latest</span>
                      <strong>Replay Pack</strong>
                    </span>
                  </a>
                </div>
              </div>
            </article>
          `}).join(``)}
    </div>
  </section>
`,cn=()=>`
  ${sn()}

  <div class="home-layout">
    ${an()}
    <section class="replay-column" aria-label="Human replay wins">
      ${nn()}

      <div class="replay-pager">
        ${Yt()}
      </div>
    </section>
  </div>
`,ln=()=>`
  <section class="builds-page" aria-label="Builds"></section>
`,un=()=>{let e=V().find(e=>e.mapImage?.localPath&&F(e.sourceSlug,e.id)?.status===`parsed`)||V()[0],t=e?F(e.sourceSlug,e.id):null,n=t?.status===`parsed`?t.players:[],r=e?.createdAt?Te.format(new Date(e.createdAt)):`Unknown date`;return`
    <section class="renderer-page" aria-label="Renderer test">
      <header class="renderer-header">
        <div>
          <p class="eyebrow">Experimental</p>
          <h1>Renderer Test</h1>
          <p class="subline">One replay target for testing a browser-based WC3 replay viewer inside this app.</p>
        </div>
      </header>

      <div class="renderer-layout">
        <section class="renderer-stage" aria-label="Renderer preview">
          ${e?.mapImage?.localPath?`<img src="${N(Me(e.mapImage.localPath))}" alt="${N(e.map)} map thumbnail" loading="lazy" />`:`<div class="renderer-placeholder">WC3</div>`}
          <div class="renderer-stage-overlay">
            <span>Renderer bridge pending</span>
            <strong>${N(e?.map||`Waiting for replay data`)}</strong>
            <small>${e?`First milestone: visual timeline and map-aware replay playback.`:`Load replay cache to select a test file.`}</small>
          </div>
        </section>

        <aside class="renderer-test-card">
          <p class="eyebrow">Test replay</p>
          ${e?`
                <h2>${N(e.sourceFlag)} ${N(e.sourceName)} on ${N(e.map)}</h2>
                <dl>
                  <div><dt>Date</dt><dd>${N(r)}</dd></div>
                  <div><dt>Replay ID</dt><dd>${N(e.id)}</dd></div>
                  <div><dt>Local file</dt><dd><code>${N(e.localPath)}</code></dd></div>
                  <div><dt>Players</dt><dd>${K(e,n)}</dd></div>
                </dl>
                <div class="renderer-actions">
                  <button class="replay-analysis-button" type="button" data-replay-detail="${N(`${e.sourceSlug}:${e.id}`)}">
                    ${B()}
                    <span>Open Analysis</span>
                  </button>
                  <a href="${N(e.downloadUrl)}" target="_blank" rel="noreferrer">Download replay</a>
                </div>
              `:`<p>No replay cache loaded yet.</p>`}
        </aside>
      </div>

      <section class="renderer-research">
        <article>
          <h2>Local wc3v Adapter</h2>
          <p>Run <code>npm run wc3v:setup</code>, then <code>npm run wc3v:serve</code>. The frame below points at the local wc3v client so we can develop the renderer beside this app without copying its code into our bundle.</p>
        </article>
        <article>
          <h2>Data Requirement</h2>
          <p>wc3v needs extracted Warcraft III data such as unit balance, icons, and map caches. That keeps Blizzard assets private on your machine and out of this repo.</p>
        </article>
        <article>
          <h2>First Target</h2>
          <p>Use the selected local replay as the first test case. Once wc3v has its data setup, the next step is passing this replay into wc3v automatically instead of manually downloading/uploading it.</p>
        </article>
      </section>

      <section class="renderer-embed" aria-label="Embedded wc3v client">
        <div class="renderer-embed-header">
          <div>
            <p class="eyebrow">wc3v local client</p>
            <h2>Embedded Viewer</h2>
          </div>
          <a href="http://127.0.0.1:8080/viewer?r=hvtw-hammerfall&hvtw=1" target="_blank" rel="noreferrer">Open wc3v</a>
        </div>
        <iframe title="wc3v local replay viewer" src="http://127.0.0.1:8080/viewer?r=hvtw-hammerfall&hvtw=1" loading="lazy"></iframe>
      </section>
    </section>
  `},dn=()=>{try{let e=JSON.parse(localStorage.getItem(`w3AssetsIndex`)||`[]`),t=Array.isArray(e)?e.length:0,n=Array.isArray(e)?e.filter(e=>String(e?.p||``).toLowerCase().endsWith(`.mpq`)).length:0,r=Array.isArray(e)?e.filter(e=>/\.(w3x|w3m)$/i.test(String(e?.p||``))).length:0,i=Array.isArray(e)?e.reduce((e,t)=>e+Number(t?.s||0),0):0,a=localStorage.getItem(`wc3-warsmash-staged-edition`)||`legacy`;return{ready:localStorage.getItem(`w3AssetsReady`)===`1`&&t>0&&a===k,edition:a,fileCount:t,mpqCount:n,mapCount:r,totalMb:(i/1048576).toFixed(1)}}catch{return{ready:!1,edition:`legacy`,fileCount:0,mpqCount:0,mapCount:0,totalMb:`0.0`}}},fn=()=>me===`windows`?{platform:`Windows`,primary:`C:\\Program Files\\Warcraft III`,secondary:`C:\\Program Files (x86)\\Warcraft III`,pickerHint:`In the folder picker, paste the path into the address bar if it does not open there automatically.`}:{platform:`macOS`,primary:`/Applications/Warcraft III (Legacy)`,secondary:`/Applications/Warcraft III`,pickerHint:`In the folder picker, press Cmd+Shift+G, paste the path, then choose the Warcraft III folder.`},Y={reforged:`2.0.4.23745`,legacy:`1.29.2.9232`},pn=[{id:`legacy`,label:`Legacy MPQ`,build:Y.legacy,status:`Playable now`,note:`Current Warsmash web path mounts classic MPQs and loose maps from this install.`},{id:`reforged`,label:`Reforged`,build:Y.reforged,status:`Experimental CASC test`,note:`Latest Reforged uses CASC assets. This app now has an experimental browser-worker CASC mount path backed by the private sandbox.`}],mn=async(e,t)=>{let n=e;for(let e of t)n=await n.getDirectoryHandle(e,{create:!0});return n},hn=async()=>{let e=await navigator.storage.getDirectory();for(let t of[`w3`,`extracted`])try{await e.removeEntry(t,{recursive:!0})}catch{}},gn=async(e=k)=>{if(!j.running){j={running:!0,done:0,total:0,bytes:0,totalBytes:0,currentName:`Reading local install...`,error:``},Q();try{let t=await fetch(`/wc3-local-assets/manifest?edition=${encodeURIComponent(e)}`,{cache:`no-store`});if(!t.ok){let e=await t.json().catch(()=>({}));throw Error(e.error||`No local MPQ-style Warcraft III install was detected.`)}let n=await t.json(),r=Array.isArray(n.files)?n.files:[];if(!r.length)throw Error(`Detected install did not include MPQ/map files Warsmash can use.`);j={running:!0,done:0,total:r.length,bytes:0,totalBytes:Number(n.totalBytes||0),currentName:`Preparing ${n.root||`local install`}`,error:``},Q(),await hn();let i=await(await navigator.storage.getDirectory()).getDirectoryHandle(`w3`,{create:!0}),a=[],o=0,s=0;for(let t of r){let c=String(t.path||``);if(!c)continue;let l=await fetch(`/wc3-local-assets/file?edition=${encodeURIComponent(e)}&path=${encodeURIComponent(c)}`);if(!l.ok)throw Error(`Failed to read ${c}`);let u=await l.blob(),d=c.split(`/`).filter(Boolean),f=await(await(await mn(i,d.slice(0,-1))).getFileHandle(d[d.length-1],{create:!0})).createWritable();await f.write(u),await f.close(),o+=1,s+=u.size,a.push({p:c,s:u.size}),j={running:!0,done:o,total:r.length,bytes:s,totalBytes:Number(n.totalBytes||s),currentName:c,error:``},(o===r.length||o%3==0)&&Q()}localStorage.setItem(`w3AssetsReady`,`1`),localStorage.setItem(`w3AssetsCount`,String(a.length)),localStorage.setItem(`w3AssetsIndex`,JSON.stringify(a)),localStorage.setItem(`w3AssetsSource`,n.root||`detected local install`),localStorage.setItem(`wc3-warsmash-staged-edition`,e),localStorage.setItem(`wc3-warsmash-selected-edition`,e),j={running:!1,done:o,total:r.length,bytes:s,totalBytes:Number(n.totalBytes||s),currentName:`Ready`,error:``},Q()}catch(e){j={...j,running:!1,error:e instanceof Error?e.message:String(e)},Q()}}},_n=async()=>{if(!A.preparing){A={...A,preparing:!0,error:``},Q();try{let e=await fetch(`/wc3-reforged-sandbox/prepare`,{cache:`no-store`}),t=await e.json().catch(()=>({}));if(!e.ok)throw Error(t.error||`Failed to prepare Reforged sandbox.`);A={checked:!0,preparing:!1,ready:!0,build:t.build||``,fileCount:Number(t.totals?.configFiles||0)+Number(t.totals?.indexFiles||0)+Number(t.totals?.dataFiles||0),totalGb:(Number(t.totals?.bytes||0)/1073741824).toFixed(2),error:``}}catch(e){A={...A,checked:!0,preparing:!1,ready:!1,error:e instanceof Error?e.message:String(e)}}Q()}},vn=()=>{let e=V().find(e=>String(e.id)===`137397`)||V().find(e=>F(e.sourceSlug,e.id)?.status===`parsed`)||V()[0],t=e?F(e.sourceSlug,e.id):null,n=t?.status===`parsed`?t.players:[],r=e?.createdAt?Te.format(new Date(e.createdAt)):`Unknown date`,i=e?`${e.sourceSlug}:${e.id}`:``,a=`/play/?menu=1&assets=${encodeURIComponent(k)}&replay=${encodeURIComponent(i)}&autostart=1`,o=`/assets/`,s=dn(),c=fn(),l=pn.find(e=>e.id===k)||pn[0],u=l.id===`legacy`,d=u?s.ready:A.ready,f=()=>k===`reforged`?`
      <div class="wc3-reforged-sandbox ${A.ready?`is-ready`:``} ${A.error?`is-error`:``}">
        <div>
          <span>Private Reforged sandbox</span>
          <strong>${A.ready?`Ready · ${N(A.build||Y.reforged)}`:`Not prepared yet`}</strong>
          <small>${A.ready?`${N(R(A.fileCount))} CASC files indexed, ${N(A.totalGb)} GB referenced read-only.`:`Creates .wc3-assets/reforged/manifest.json and indexes your Reforged CASC data without modifying the install.`}</small>
          ${A.error?`<small>${N(A.error)}</small>`:``}
        </div>
        <button type="button" data-reforged-prepare ${A.preparing?`disabled`:``}>
          ${A.preparing?`Preparing...`:A.ready?`Refresh Sandbox`:`Prepare Reforged Sandbox`}
        </button>
      </div>
    `:``,ee=j.totalBytes?Math.min(100,j.bytes/j.totalBytes*100):0,te=j.running?`${j.done}/${j.total} ${(j.bytes/1048576).toFixed(1)} / ${(j.totalBytes/1048576).toFixed(1)} MB`:``;return`
    <section class="renderer-page wc3-viewer-page" aria-label="WC3 replay viewer">
      <header class="renderer-header">
        <div>
          <p class="eyebrow">Warsmash engine spike</p>
          <h1>WC3 Replay Viewer</h1>
          <p class="subline">A local test page for booting the Warsmash browser engine and opening our parsed test replay while the full replay-playback bridge is built.</p>
        </div>
      </header>

      <div class="renderer-layout">
        <section class="renderer-stage wc3-viewer-stage" aria-label="Warsmash browser engine">
          ${O?`
        <iframe title="Warsmash WC3 engine" src="${a}" loading="lazy" allow="screen-wake-lock; fullscreen; autoplay"></iframe>
      `:`
      <div class="wc3-viewer-offline">
        <p class="eyebrow">${d?`Ready`:`One-time setup`}</p>
        <h2>${d?`Start Engine Test`:`Connect Warcraft III`}</h2>
        <p>${d?u?`Warcraft III assets are staged locally: ${s.fileCount} files, ${s.mpqCount} MPQs, ${s.mapCount} maps, ${s.totalMb} MB. This boots Warsmash against the selected test replay target; full .w3g playback still needs the replay bridge.`:`Reforged CASC sandbox is indexed locally for build ${A.build||Y.reforged}. This attempts the new browser-worker CASC mount path; full .w3g playback still needs the replay bridge.`:u?`The viewer needs your own legacy Warcraft III MPQ install for the current Warsmash web engine path. The browser stores it once, then reuses the local cache.`:`Your Reforged install is detected. Prepare the private sandbox to let the embedded Warsmash worker try the new CASC mount path.`}</p>
        <div class="wc3-version-picker" role="radiogroup" aria-label="Warcraft III version">
          ${pn.map(e=>`
                <button class="${e.id===k?`is-selected`:``}" type="button" role="radio" aria-checked="${e.id===k}" data-warsmash-edition="${N(e.id)}">
                  <strong>${N(e.label)}</strong>
                  <span>${N(e.build)}</span>
                  <small>${N(e.status)}</small>
                </button>
              `).join(``)}
        </div>
        <div class="wc3-viewer-offline-actions">
          ${d?`
                <button class="warsmash-start-button" type="button" data-warsmash-watch="${N(i)}">
                  ${B()}
                  <span>${u?`Start Engine Test`:`Start Reforged Engine Test`}</span>
                </button>
                <a href="${o}" target="_blank" rel="noreferrer">Manage Assets</a>
              `:`
                <button class="is-primary" type="button" data-warsmash-auto-stage ${j.running||!u?`disabled`:``}>
                  ${j.running?`Staging Detected Install...`:`Auto Stage Detected Install`}
                </button>
                <a href="${o}" target="_blank" rel="noreferrer">Manual Folder Picker</a>
                <button class="replay-analysis-button is-muted" type="button" disabled>
                  ${B()}
                  <span>Play unlocks after setup</span>
                </button>
              `}
        </div>
        ${f()}
        ${j.running||j.error?`
              <div class="wc3-auto-stage-status ${j.error?`is-error`:``}">
                ${j.running?`<div class="wc3-auto-stage-bar"><span style="width: ${ee.toFixed(1)}%;"></span></div><strong>${N(te)}</strong><small>${N(j.currentName)}</small>`:`<strong>Auto staging failed</strong><small>${N(j.error)}</small>`}
              </div>
            `:``}
        <div class="wc3-install-hint">
          <span>Suggested ${N(c.platform)} folder</span>
          <code>${N(l.id===`legacy`?c.primary:c.secondary)}</code>
          <small>${N(l.note)}</small>
          <small>${u?`Auto stage uses the detected local MPQ-style install. Use the manual picker only if auto stage fails. ${c.pickerHint}`:`The sandbox is read-only and local. The new CASC worker path can now be tested; replay playback still needs the command bridge.`}</small>
        </div>
      </div>
      <div class="renderer-stage-overlay">
        <span>Setup order</span>
        <strong>${d?`Click Start`:u?`Stage assets first`:`Prepare sandbox first`}</strong>
        <small>${d?`Boots the engine now; full in-engine .w3g playback is not implemented in Warsmash yet.`:u?`Use Auto Stage Detected Install. It avoids copying the huge Reforged folder.`:`Prepare the read-only Reforged sandbox, then start the new CASC worker path.`}</small>
      </div>
    `}
        </section>

        <aside class="renderer-test-card">
          <p class="eyebrow">Test replay</p>
          ${e?`
                <h2>${N(e.sourceFlag)} ${N(e.sourceName)} on ${N(e.map)}</h2>
                <dl>
                  <div><dt>Date</dt><dd>${N(r)}</dd></div>
                  <div><dt>Replay ID</dt><dd>${N(e.id)}</dd></div>
                  <div><dt>Local replay</dt><dd><code>${N(e.localPath)}</code></dd></div>
                  <div><dt>Selected version</dt><dd>${N(l.label)} · ${N(l.status)}</dd></div>
                  <div><dt>Assets status</dt><dd>${d?u?`Ready: ${s.fileCount} files staged`:`Sandbox ready: ${A.fileCount} CASC files`:u?`Setup required`:`Prepare Reforged sandbox`}</dd></div>
                  <div><dt>Suggested folder</dt><dd><code>${N(l.id===`legacy`?c.primary:c.secondary)}</code></dd></div>
                  <div><dt>Players</dt><dd>${K(e,n)}</dd></div>
                </dl>
                <div class="renderer-actions">
                  <button class="replay-analysis-button" type="button" data-replay-detail="${N(`${e.sourceSlug}:${e.id}`)}">
                    ${B()}
                    <span>Open Analysis</span>
                  </button>
                  ${d?`<button class="warsmash-start-button" type="button" data-warsmash-watch="${N(i)}">${B()}<span>${u?`Start Engine Test`:`Start Reforged Engine Test`}</span></button>`:`<button type="button" data-warsmash-auto-stage ${j.running||!u?`disabled`:``}>${j.running?`Staging Detected Install...`:u?`Auto Stage Detected Install`:`Reforged Support Pending`}</button>`}
                  <a href="${a}" target="_blank" rel="noreferrer">Open Standalone Viewer</a>
                </div>
              `:`<p>No replay cache loaded yet.</p>`}
        </aside>
      </div>

      <section class="renderer-research">
        <article>
          <h2>What This Tests</h2>
          <p>This page boots the Warsmash browser engine from the same local Vite origin and keeps our selected replay beside it as the target case. The first proof is engine boot with local WC3 assets; replay command playback comes after that.</p>
        </article>
        <article>
          <h2>Why Legacy First</h2>
          <p>The detected legacy install has classic MPQs and stock maps, matching the Warsmash branch's current web asset path better than modern Reforged CASC files.</p>
        </article>
        <article>
          <h2>Replay Gap</h2>
          <p>Warsmash exposes a WC3 menu and map engine path. The <code>View Replay</code> button now hands off to this app's parsed Replay Theater; full deterministic <code>.w3g</code> simulation still needs a deeper engine command bridge.</p>
        </article>
        <article>
          <h2>Patch Support</h2>
          <p>Your Reforged install is detected as <code>${Y.reforged}</code>. The worker now has an experimental CASC mount path, while legacy remains available through classic MPQs from <code>${Y.legacy}</code>.</p>
        </article>
        <article>
          <h2>What A Fork Needs</h2>
          <p>To play latest-patch replays in-engine, we need a browser-safe CASC data source, map/object-data compatibility for 2.x, a <code>.w3g</code> command feeder, deterministic simulation checks, and controls that drive the engine clock.</p>
        </article>
      </section>

      <section class="renderer-embed wc3-viewer-steps" aria-label="WC3 replay viewer setup">
        <div class="renderer-embed-header">
          <div>
            <p class="eyebrow">Simple setup</p>
            <h2>What To Click</h2>
          </div>
          <a href="https://github.com/ErikSom/WarsmashModEngine/tree/HTML" target="_blank" rel="noreferrer">Warsmash HTML</a>
        </div>
        <div class="wc3-viewer-command-grid">
          <div class="${s.ready?`is-done`:`is-current`}"><span>1</span><strong>Set up install</strong><small>Click Auto Stage Detected Install. It streams the local MPQ install into browser storage and remembers it.</small></div>
          <div class="${s.ready?`is-current`:``}"><span>2</span><strong>Return here</strong><small>The page detects the staged assets automatically when you come back.</small></div>
          <div><span>3</span><strong>Start engine</strong><small>Click Start Engine Test. This boots the engine beside the selected test replay card.</small></div>
          <div><span>4</span><strong>Replay bridge</strong><small>Click View Replay in the engine menu to open the parsed Replay Theater. Native in-engine replay playback still needs the Warsmash command bridge.</small></div>
        </div>
      </section>
    </section>
  `},X=(e,t,n=``)=>`
  <article class="statistics-metric">
    <span>${N(e)}</span>
    <strong>${N(t)}</strong>
    ${n?`<small>${N(n)}</small>`:``}
  </article>
`,Z=(e,t=`No parsed data yet`)=>e.length?e.map(([e,t])=>`
            <div class="statistics-object-row">
              <span>${L(e)}${N(Ie(I(e)).replace(` (${e})`,``))}</span>
              <strong>${N(R(t))}</strong>
            </div>
          `).join(``):`<div class="analysis-empty"><strong>${N(t)}</strong></div>`,yn=(e,t=`No parsed data yet`)=>e.length?e.map(([e,t])=>`
            <div class="statistics-text-row">
              <span>${N(e)}</span>
              <strong>${N(R(t))}</strong>
            </div>
          `).join(``):`<div class="analysis-empty"><strong>${N(t)}</strong></div>`,bn=()=>{let e=mt(),t=e.humanGames||1,n=G(e.boughtItems,10),r=G(e.foundItems,8);return`
    <section class="statistics-page" aria-label="Replay statistics">
      <header class="statistics-header">
        <div>
          <p class="eyebrow">Parsed replay data</p>
          <h1>Statistics</h1>
          <p class="subline">Aggregated from Human player-games in the replay analysis cache.</p>
        </div>
      </header>

      <div class="statistics-metrics" aria-label="Replay data summary">
        ${X(`Parsed replays`,R(e.parsedReplays),`Allowed map pool only`)}
        ${X(`Human player-games`,R(e.humanGames),`One Human player in most rows`)}
        ${X(`Average Human APM`,R(e.averageApm),`Parsed APM samples`)}
        ${X(`Item actions`,R(e.totalItemActions),`Buys, uses, and item commands`)}
      </div>

      <section class="statistics-panel statistics-hero-panel">
        <div class="statistics-panel-header">
          <div>
            <p class="eyebrow">Human heroes</p>
            <h2>Pick Rate</h2>
          </div>
          <span>${N(R(e.humanGames))} Human games</span>
        </div>
        <div class="statistics-hero-grid">
          ${U.map(n=>{let r=e.heroPicks.get(n)||0,i=e.firstHeroPicks.get(n)||0,a=e.humanGames?r/t*100:0,o=e.humanGames?i/t*100:0;return`
                <article class="statistics-hero-card">
                  <div>
                    ${L(n)}
                    <h3>${N(Le(n))}</h3>
                  </div>
                  <dl>
                    <div><dt>Picked</dt><dd>${N(R(r))}</dd></div>
                    <div><dt>Pick rate</dt><dd>${N(qe(a))}</dd></div>
                    <div><dt>First hero</dt><dd>${N(R(i))}</dd></div>
                    <div><dt>First rate</dt><dd>${N(qe(o))}</dd></div>
                  </dl>
                </article>
              `}).join(``)}
        </div>
      </section>

      <div class="statistics-grid">
        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Shop purchases</p>
              <h2>Items Bought</h2>
            </div>
            <span>${N(Be(e.knownBoughtGold))}</span>
          </div>
          <div class="statistics-list">
            ${Z(n,`No shop purchases found`)}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Non-shop item events</p>
              <h2>Items Found</h2>
            </div>
            <span>${N(R([...e.foundItems.values()].reduce((e,t)=>e+t,0)))}</span>
          </div>
          <div class="statistics-list">
            ${Z(r,`No non-shop item events found`)}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Parser limitation</p>
              <h2>Items Sold</h2>
            </div>
          </div>
          <div class="statistics-unavailable">
            <strong>Not available yet</strong>
            <p>The current replay parser exposes item command counts and item obtain/buy events, but not a reliable sold-item event. We should add a parser-level sell detector before showing sold stats.</p>
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Army</p>
              <h2>Most Trained Units</h2>
            </div>
          </div>
          <div class="statistics-list">
            ${Z(G(e.unitCounts,10),`No unit stats found`)}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Tech and base</p>
              <h2>Buildings</h2>
            </div>
          </div>
          <div class="statistics-list">
            ${Z(G(e.buildingCounts,10),`No building stats found`)}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Research</p>
              <h2>Upgrades</h2>
            </div>
          </div>
          <div class="statistics-list">
            ${Z(G(e.upgradeCounts,10),`No upgrade stats found`)}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Map pool</p>
              <h2>Most Common Maps</h2>
            </div>
          </div>
          <div class="statistics-list">
            ${yn(G(e.mapCounts,8),`No map stats found`)}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Matchups</p>
              <h2>Opponent Spread</h2>
            </div>
          </div>
          <div class="statistics-list">
            ${yn(G(e.matchupCounts,8),`No matchup stats found`)}
          </div>
        </section>
      </div>
    </section>
  `},xn=()=>{let e=V(),t=e.map(e=>({replay:e,analysis:F(e.sourceSlug,e.id)})).filter(e=>e.analysis?.status===`parsed`),n=new Map,r=new Map,i=new Map,a=0,o=0,s=0,c=0,l=0;return t.forEach(({replay:e,analysis:t})=>{W(n,t.version||e.version||`Unknown`),W(r,e.map||t.map?.file||`Unknown map`),a+=t.chat?.length||0,s+=t.chat?.length||0,(t.players||[]).forEach(e=>{o+=1,Number.isFinite(e.apm)&&(c+=e.apm,l+=1),Object.entries(e.actions||{}).forEach(([e,t])=>{W(i,e,t||0)}),s+=(e.heroes||[]).length,s+=(e.order?.buildings||[]).length,s+=(e.order?.units||[]).length,s+=(e.order?.upgrades||[]).length,s+=(e.order?.items||[]).length})}),{totalReplays:e.length,parsedReplays:t.length,parsedPlayers:o,eventCount:s,chatMessages:a,averageApm:l?Math.round(c/l):0,versionCounts:n,mapCounts:r,actionCounts:i}},Sn=e=>e.length?e.map(([e,t])=>`
            <div class="w3gjs-action-row">
              <span>${N(e)}</span>
              <strong>${N(R(t))}</strong>
            </div>
          `).join(``):`<div class="analysis-empty"><strong>No action data parsed yet</strong></div>`,Cn=e=>e.length?e.map(e=>`
            <div class="w3gjs-event-row">
              <span>${N(e.time||J(e.ms||0))}</span>
              <div>
                <strong>${N(e.type===`Chat`?e.playerName:I(e.id))}</strong>
                <small>${N(e.type===`Chat`?e.detail:`${e.playerName||`Player`} · ${e.detail||e.type}`)}</small>
              </div>
            </div>
          `).join(``):`<div class="analysis-empty"><strong>No timeline events parsed yet</strong></div>`,wn=()=>{let e=xn(),t=V().find(e=>String(e.id)===`137397`)||V().find(e=>F(e.sourceSlug,e.id)?.status===`parsed`)||V()[0],n=t?F(t.sourceSlug,t.id):null,r=n?.status===`parsed`?n.players:[],i=It(n),a=i.slice(0,12),o=i.filter(e=>(e.ms||0)>=18e4).slice(0,12),s=G(e.actionCounts,12),c=G(e.versionCounts,4),l=G(e.mapCounts,6);return`
    <section class="w3gjs-page" aria-label="w3gjs replay parser showcase">
      <header class="w3gjs-hero">
        <div>
          <p class="eyebrow">Replay parser lab</p>
          <h1>w3gjs</h1>
          <p class="subline">This is the part that is already real: local <code>.w3g</code> parsing for metadata, players, races, heroes, APM, actions, build orders, upgrades, items, chat, and map references.</p>
          <div class="w3gjs-hero-actions">
            <a href="https://github.com/PBug90/w3gjs" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://pbug90.github.io/wc3-replay-parser-web/" target="_blank" rel="noreferrer">Browser demo</a>
            <a href="https://pbug90.github.io/w3gjs/" target="_blank" rel="noreferrer">API docs</a>
          </div>
        </div>
        <aside class="w3gjs-code-card">
          <span>High-level API</span>
          <pre><code>import W3GReplay from "w3gjs";

const parser = new W3GReplay();
const result = await parser.parse("replay.w3g");</code></pre>
        </aside>
      </header>

      <div class="statistics-metrics w3gjs-metrics" aria-label="w3gjs parsed data summary">
        ${X(`Replay files`,R(e.totalReplays),`From the local replay cache`)}
        ${X(`Parsed replays`,R(e.parsedReplays),`Built from w3gjs output`)}
        ${X(`Parsed players`,R(e.parsedPlayers),`Names, races, teams, APM`)}
        ${X(`Timeline events`,R(e.eventCount),`Builds, units, items, heroes, chat`)}
      </div>

      <section class="w3gjs-showcase">
        <div class="w3gjs-replay-card">
          <p class="eyebrow">Selected replay</p>
          ${t?`
                <h2>${N(t.sourceFlag)} ${N(t.sourceName)} on ${N(t.map)}</h2>
                <div class="analysis-modal-matchup">${K(t,r)}</div>
                <dl>
                  <div><dt>Game</dt><dd>${N(n?.gameName||`Unknown`)}</dd></div>
                  <div><dt>Patch</dt><dd>${N(n?.version||t.version||`Unknown`)}</dd></div>
                  <div><dt>Build</dt><dd>${N(n?.buildNumber||`Unknown`)}</dd></div>
                  <div><dt>Duration</dt><dd>${N(n?.durationLabel||t.durationLabel||`Unknown`)}</dd></div>
                  <div><dt>Map file</dt><dd><code>${N(n?.map?.file||t.map||`Unknown`)}</code></dd></div>
                  <div><dt>Local file</dt><dd><code>${N(t.localPath||n?.sourceFile||``)}</code></dd></div>
                </dl>
                <button class="replay-analysis-button" type="button" data-replay-detail="${N(`${t.sourceSlug}:${t.id}`)}">
                  ${B()}
                  <span>Open Full Analysis Tabs</span>
                </button>
              `:`<p>No replay cache loaded yet.</p>`}
        </div>

        <div class="w3gjs-parser-card">
          <p class="eyebrow">What it can power</p>
          <h2>Magic We Can Build</h2>
          <div class="w3gjs-feature-grid">
            <span>Opening detection</span>
            <span>APM spikes</span>
            <span>Hero progression</span>
            <span>Item economy</span>
            <span>Build-order search</span>
            <span>Patch checks</span>
            <span>Chat markers</span>
            <span>Replay importer</span>
          </div>
        </div>
      </section>

      <div class="w3gjs-grid">
        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Minute-by-minute</p>
              <h2>APM Fingerprint</h2>
            </div>
            <span>${N(R(e.averageApm))} avg APM</span>
          </div>
          ${St({...n,players:r})}
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Event stream</p>
              <h2>First 12 Events</h2>
            </div>
          </div>
          <div class="w3gjs-event-list">
            ${Cn(a)}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Mid game</p>
              <h2>After 3 Minutes</h2>
            </div>
          </div>
          <div class="w3gjs-event-list">
            ${Cn(o)}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Commands</p>
              <h2>Action Types</h2>
            </div>
          </div>
          <div class="w3gjs-action-list">
            ${Sn(s)}
          </div>
        </section>

        <section class="statistics-panel w3gjs-wide-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Build extraction</p>
              <h2>Opening Build Order</h2>
            </div>
          </div>
          ${Dt({...n,players:r})}
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Items</p>
              <h2>Shop Purchases</h2>
            </div>
          </div>
          ${kt({...n,players:r})}
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Items</p>
              <h2>Creep Drops / Found</h2>
            </div>
          </div>
          ${At({...n,players:r})}
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Patch spread</p>
              <h2>Parsed Versions</h2>
            </div>
          </div>
          <div class="statistics-list">
            ${yn(c,`No versions parsed`)}
          </div>
        </section>

        <section class="statistics-panel">
          <div class="statistics-panel-header">
            <div>
              <p class="eyebrow">Map references</p>
              <h2>Common Maps</h2>
            </div>
          </div>
          <div class="statistics-list">
            ${yn(l,`No maps parsed`)}
          </div>
        </section>
      </div>
    </section>
  `},Tn=[{title:`Ladder / Stats`,links:[{label:`W3Champions`,href:`https://w3champions.com/`},{label:`W3Champions Rankings`,href:`https://w3champions.com/Rankings`},{label:`Warcraft3.info Elo`,href:`https://warcraft3.info/stats/elo_ranking`},{label:`Liquipedia Rankings`,href:`https://liquipedia.net/warcraft/Portal:Statistics`}]},{title:`Replays / Matches`,links:[{label:`Warcraft3.info Replays`,href:`https://warcraft3.info/replays/`},{label:`WC3V`,href:`https://wc3v.com/`},{label:`W3Champions Matches`,href:`https://w3champions.com/Matches`},{label:`Back2Warcraft VODs`,href:`https://www.youtube.com/@Back2Warcraft`}]},{title:`News / Wikis`,links:[{label:`Warcraft3.info`,href:`https://warcraft3.info/`},{label:`Liquipedia Warcraft`,href:`https://liquipedia.net/warcraft/Main_Page`},{label:`Back2Warcraft`,href:`https://www.back2warcraft.com/`},{label:`Blizzard WC3 Forums`,href:`https://us.forums.blizzard.com/en/warcraft3/`}]},{title:`Community / Discord`,links:[{label:`WC3 Gym Discord`,href:`https://discord.gg/7HUyQAKQ8p`},{label:`Back2Warcraft Discord`,href:`https://discord.gg/56YEYfpy52`},{label:`WC3 Gym`,href:`https://warcraft-gym.com/`},{label:`Warcraft 3 Reddit`,href:`https://www.reddit.com/r/WC3/`}]},{title:`Maps / Modding`,links:[{label:`Hive Workshop`,href:`https://www.hiveworkshop.com/`},{label:`Hive Maps`,href:`https://www.hiveworkshop.com/repositories/maps.564/`},{label:`Hive Models`,href:`https://www.hiveworkshop.com/repositories/models.530/`},{label:`WC3 Maps`,href:`https://wc3maps.com/`},{label:`Epic War`,href:`https://www.epicwar.com/`},{label:`WC3 Icons`,href:`https://wc3icons.coffbox.win/`}]},{title:`GitHub`,links:[{label:`w3gjs`,href:`https://github.com/PBug90/w3gjs`,updated:`Updated Jun 15, 2026`},{label:`wc3v`,href:`https://github.com/jblanchette/wc3v`,updated:`Updated Jun 27, 2026`},{label:`warcrumb`,href:`https://github.com/efskap/warcrumb`,updated:`Updated Nov 17, 2020`},{label:`w3rs`,href:`https://github.com/aesteve/w3rs`,updated:`Updated Aug 7, 2022`},{label:`War3Net`,href:`https://github.com/Drake53/War3Net`,updated:`Updated Jun 27, 2026`},{label:`Warsmash`,href:`https://github.com/Retera/WarsmashModEngine`,updated:`Updated Jun 27, 2026`},{label:`Warsmash HTML`,href:`https://github.com/ErikSom/WarsmashModEngine/tree/HTML`,updated:`Updated May 11, 2026`},{label:`W3Champions website`,href:`https://github.com/w3champions/website`,updated:`Updated Jun 25, 2026`},{label:`wc3maptranslator`,href:`https://github.com/ChiefOfGxBxL/WC3MapTranslator`,updated:`Updated Dec 21, 2025`}]}],En=e=>{try{let t=new URL(e);return`https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(t.origin)}&sz=64`}catch{return``}},Dn=e=>`
  <section class="resources-card">
    <header>
      <p class="eyebrow">${N(e.title)}</p>
    </header>
    <div class="resources-link-list">
      ${e.links.map(e=>`
            <a href="${N(e.href)}" target="_blank" rel="noreferrer">
              <img src="${N(En(e.href))}" alt="" loading="lazy" onerror="this.remove()" />
              <span>${N(e.label)}</span>
              ${e.updated?`<em>${N(e.updated)}</em>`:``}
              <small>${N(e.href.replace(/^https?:\/\//,``).replace(/\/$/,``))}</small>
            </a>
          `).join(``)}
    </div>
  </section>
`,On=()=>`
  <section class="resources-page" aria-label="Warcraft III resources">
    <header class="resources-header">
      <div>
        <p class="eyebrow">Warcraft III directory</p>
        <h1>Resources</h1>
        <p class="subline">Active Warcraft III hubs, tooling, replay libraries, and community references for building the Human vs The World knowledge base.</p>
      </div>
    </header>
    <div class="resources-grid">
      ${Tn.map(Dn).join(``)}
    </div>
  </section>
`,kn=()=>{let e=m?.players||[];return`
    <section class="money-page" aria-label="Player earnings">
      <header class="money-header">
        <div>
          <p class="eyebrow">All-time leaderboard</p>
          <h1>Player Earnings</h1>
          <p class="subline">The all-time prize money leaderboard for Human players.</p>
        </div>
      </header>
      <div class="money-table" role="table" aria-label="Human earnings leaderboard">
        <div class="money-row is-heading" role="row">
          <span>Rank</span>
          <span>Player</span>
          <span>Country</span>
          <span>Race</span>
          <span>Earnings</span>
        </div>
        ${e.length?e.map(e=>`
                    <div class="money-row" role="row">
                      <span>#${N(e.rank)}</span>
                      <strong class="money-player-name">
                        <img src="${t}" alt="" aria-hidden="true" />
                        <span>${N(e.name)}</span>
                      </strong>
                      <span>${N(e.flag||``)} ${N(e.country||`Unknown`)}</span>
                      <span>${N(e.race||`Human`)}</span>
                      <strong class="money-amount">${N(e.earningsLabel)}</strong>
                    </div>
                  `).join(``):`<div class="analysis-empty"><strong>Earnings unavailable</strong><span>Run the Liquipedia earnings fetch script to generate the local cache.</span></div>`}
      </div>
      <p class="money-note">${N(m?.scope||``)}</p>
    </section>
  `},An=()=>{let e=document.querySelector(`.replay-pager`);e&&(e.innerHTML=Yt(),Ln(),zn())},jn=()=>{y=1},Mn=()=>{document.querySelectorAll(`[data-player-filter]`).forEach(e=>{let t=e.dataset.playerFilter===h;e.classList.toggle(`is-selected`,t),e.setAttribute(`aria-pressed`,String(t)),e.closest(`.player-card`)?.classList.toggle(`is-selected`,t),e.classList.contains(`ranking-row`)&&e.classList.toggle(`is-selected`,t)})},Nn=e=>{h=h===e?`all`:e,jn(),Mn(),An()},Pn=(e=null)=>{document.querySelectorAll(`.dropdown-filter.is-open`).forEach(t=>{t!==e&&(t.classList.remove(`is-open`),t.querySelector(`.filter-dropdown-button`)?.setAttribute(`aria-expanded`,`false`))})},Fn=()=>{let e=document.querySelector(`.filter-popover`);e&&(e.classList.remove(`is-open`),e.querySelector(`.filters-toggle`)?.setAttribute(`aria-expanded`,`false`),Pn())},In=()=>{let e=document.querySelector(`.filters`);e&&(e.outerHTML=nn(),Vn())},Ln=()=>{document.querySelectorAll(`.pagination-button[data-page]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=Number(e.dataset.page);!Number.isFinite(t)||e.disabled||t===y||(y=t,An(),document.querySelector(`.replay-column`)?.scrollIntoView({block:`start`,behavior:`smooth`}))})})},Rn=()=>{b=null,T=`overview`,Q()},zn=()=>{document.querySelectorAll(`.replay-row[data-replay-detail]`).forEach(e=>{e.addEventListener(`click`,t=>{t.target.closest(`a, button`)||(b=e.dataset.replayDetail,T=`overview`,Q())}),e.addEventListener(`keydown`,t=>{t.key!==`Enter`&&t.key!==` `||t.target.closest(`a, button`)||(t.preventDefault(),b=e.dataset.replayDetail,T=`overview`,Q())})}),document.querySelectorAll(`.replay-analysis-button[data-replay-detail]`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),t.stopPropagation(),b=e.dataset.replayDetail,T=`overview`,Q()})}),document.querySelectorAll(`[data-analysis-tab]`).forEach(e=>{e.addEventListener(`click`,()=>{T=e.dataset.analysisTab||`overview`,Q()})}),document.querySelectorAll(`[data-modal-close]`).forEach(e=>{e.addEventListener(`click`,t=>{t.target===e&&Rn()})}),document.querySelectorAll(`[data-theater-close]`).forEach(e=>{e.addEventListener(`click`,t=>{t.target===e&&Lt()})}),document.querySelector(`[data-theater-play]`)?.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),zt()}),document.querySelector(`[data-theater-reset]`)?.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),C=0,S=!1,w&&=(clearInterval(w),null),Q()})},Bn=()=>{document.querySelectorAll(`[data-player-filter]`).forEach(e=>{e.addEventListener(`click`,t=>{t.target.closest(`.ranking-stream`)||Nn(e.dataset.playerFilter)}),e.addEventListener(`keydown`,t=>{e.tagName!==`BUTTON`&&(t.key!==`Enter`&&t.key!==` `||(t.preventDefault(),Nn(e.dataset.playerFilter)))})})},Vn=()=>{let e=document.querySelector(`#replay-search`);if(!e)return;e.addEventListener(`input`,e=>{pe=e.target.value,jn(),An()});let t=document.querySelector(`.filter-popover`),n=document.querySelector(`.filters-toggle`);n?.addEventListener(`click`,e=>{e.stopPropagation();let r=t?.classList.toggle(`is-open`)||!1;n.setAttribute(`aria-expanded`,String(r)),r||Pn()}),t?.addEventListener(`click`,e=>{e.stopPropagation()}),document.querySelectorAll(`.dropdown-filter`).forEach(e=>{let t=e.querySelector(`.filter-dropdown-button`),n=e.dataset.filter;t?.addEventListener(`click`,n=>{n.stopPropagation();let r=e.classList.toggle(`is-open`);Pn(e),t.setAttribute(`aria-expanded`,String(r))}),e.querySelectorAll(`.filter-dropdown-option`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.value||`all`;n===`map-filter`&&(g=t),n===`hero-filter`&&(_=t),n===`matchup-filter`&&(v=t),jn(),Pn(),In(),An()})})})},Hn=()=>{let e=document.querySelector(`.player-card-strip`);if(!e)return;let t=!1,n=0,r=0,i=!1;e.addEventListener(`pointerdown`,a=>{if(a.button===0){if(a.target.closest(`a, button, input, select, textarea, label`)){t=!1,i=!1;return}t=!0,i=!1,n=a.clientX,r=e.scrollLeft,e.classList.add(`is-dragging`),e.setPointerCapture(a.pointerId)}}),e.addEventListener(`pointermove`,a=>{if(!t)return;let o=a.clientX-n;Math.abs(o)>4&&(i=!0),e.scrollLeft=r-o});let a=n=>{t&&(t=!1,e.classList.remove(`is-dragging`),e.hasPointerCapture(n.pointerId)&&e.releasePointerCapture(n.pointerId))};e.addEventListener(`pointerup`,a),e.addEventListener(`pointercancel`,a),e.addEventListener(`click`,e=>{i&&=(e.preventDefault(),e.stopPropagation(),!1)},!0)},Un=e=>`
  <ul class="app-info-link-list">
    ${e.map(e=>`
          <li>
            <a href="${N(e.href)}" target="_blank" rel="noreferrer">${N(e.label)}</a>
            <span>${N(e.description)}</span>
          </li>
        `).join(``)}
  </ul>
`,Wn=e=>`
  <ul class="app-info-feature-list">
    ${e.map(e=>`<li>${e}</li>`).join(``)}
  </ul>
`,Gn=()=>D===`analyze`?`
      <section>
        <h3>Analyze Tabs</h3>
        <p>Overview summarizes map, matchup, duration, winner data, and parsed player metadata.</p>
        <p>APM shows per-player action pace over the replay timeline.</p>
        <p>Build Order, Upgrades, Items Bought, and Items Found are parsed from replay events and enriched with known labels, icons, gold costs, and drop odds where available.</p>
        <p>Chatlog lists parsed chat messages. Actions shows action-type totals by player.</p>
      </section>
      <section>
        <h3>Better Analysis Ideas</h3>
        ${Wn([`Opening classifier: auto-label fast expansion, rifle caster, tower rush, one-base tech, and other Human build families.`,`Timing benchmarks: compare hero levels, expansions, tech, shop purchases, and first fights against the player average.`,`Mistake detector: surface idle Town Hall time, late shop, delayed lumber tech, supply blocks, and missed upgrades.`,`Matchup-specific filters: Human vs Orc, Undead, Night Elf, and mirror dashboards with different KPIs.`])}
      </section>
    `:D===`updates`?`
      <section>
        <h3>Keeping It Updated</h3>
        <p>Use scheduled, cached update jobs with rate limits instead of live scraping. Store fetched pages with timestamps, revalidate only changed sources, and keep a manual refresh command for development.</p>
        <p>Prefer official APIs, static dumps, GitHub-hosted data, or locally extracted map/replay files. For community sites, use clear user agents, delays, and small batches so the app stays respectful and maintainable.</p>
      </section>
      <section>
        <h3>Update Workflow</h3>
        ${Wn([`<code>npm run update:replays</code> refreshes top Human rankings, replay metadata, replay downloads, and map images from Warcraft3.info.`,`<code>npm run analyze:replays</code> rebuilds parsed replay summaries from local <code>.w3g</code> files.`,`<code>npm run update:earnings</code> refreshes cached Liquipedia earnings with polite delays.`,`<code>npm run build:packs</code> rebuilds downloadable player replay packs from the local replay cache.`])}
      </section>
    `:D===`features`?`
      <section>
        <h3>Good Next Features</h3>
        ${Wn([`Replay importer: drag in a <code>.w3g</code> file, parse it locally, and compare it against the featured Human player database.`,`In-app replay timeline: scrub through build order, hero levels, army size, item pickups, creeps, and fights without a full game renderer.`,`Game renderer experiment: embed or integrate a browser Warcraft III engine path so selected replays can be watched inside the app.`,`Source freshness panel: show when rankings, replays, earnings, map images, icons, and analysis were last updated.`,`Player matchup dashboards: per-player Human vs Orc, Undead, Night Elf, and mirror win patterns with build recommendations.`,`Map lab: creep-route overlays, item drop tables, expansion timings, and common Human creep paths per map.`,`Searchable build library: save notable openings from parsed replays and filter by matchup, map, patch, hero, and timing.`,`Replay quality score: flag incomplete parses, missing map tables, suspicious metadata, low duration games, and duplicate replay files.`])}
      </section>
    `:D===`renderer`?`
      <section>
        <h3>Can We View Replays Here?</h3>
        <p>Yes, for private local use this is possible as a research project. The app should not bundle Warcraft III game assets; instead it can ask you to point the local app at your own Warcraft III installation or extracted asset folder.</p>
        <p>The closest practical match I found is wc3v: it renders WC3 replays in-browser by parsing replay data, reconstructing units and events, and drawing a 3D map view. Warsmash is still the deeper engine inspiration because it proves Warcraft III-style rendering can run in the browser.</p>
        ${Un([{label:`wc3v replay viewer`,href:`https://github.com/jblanchette/wc3v`,description:`In-browser WC3 replay viewer using parsed replay data and Three.js map rendering; likely the best starting point.`},{label:`Warsmash HTML branch`,href:`https://github.com/ErikSom/WarsmashModEngine/tree/HTML`,description:`Browser-focused Warsmash branch to study as inspiration for a renderer experiment.`},{label:`Warsmash browser demo`,href:`https://warsmash.pages.dev/`,description:`Live proof that this rendering direction can work in a browser.`},{label:`Warsmash upstream`,href:`https://github.com/Retera/WarsmashModEngine`,description:`Engine source and documentation for the asset/data-source model.`}])}
      </section>
      <section>
        <h3>Implementation Plan</h3>
        ${Wn([`<strong>Phase 1: renderer test page.</strong> Pick one replay and wire a test route where the viewer can be developed without touching the main replay table.`,`<strong>Phase 2: wc3v spike.</strong> Test whether wc3v parsing/rendering pieces can be adapted to our local replay cache and Vite app.`,`<strong>Phase 3: map-aware visual replay.</strong> Render terrain, camera pan/zoom, minimap, starting locations, buildings, units, creep camps, and fight markers.`,`<strong>Phase 4: local asset setup.</strong> Add a private settings screen where you choose a Warcraft III install or extracted asset folder. Store only the local path in browser storage or a local config file.`,`<strong>Phase 5: Warsmash engine spike.</strong> Only if we need fuller game simulation, test whether Warsmash can be embedded and controlled through a replay-viewer bridge.`,`<strong>Phase 6: analysis overlay.</strong> Layer our current insights over playback: build timings, APM spikes, item drops, hero levels, fight markers, and bookmarks.`])}
      </section>
      <section>
        <h3>Hard Parts</h3>
        ${Wn([`A wc3v-style viewer is achievable sooner because it reconstructs replay visualization rather than fully simulating Warcraft III.`,`Full deterministic replay playback still needs the same map data, object data, patch assumptions, command ordering, and simulation behavior the original game used.`,`The browser needs access to many local game assets, which is fine for your private machine but should stay out of the repo and production bundle.`,`Warsmash is inspiration and possibly a base, but it may need adaptation for replay playback rather than only loading/running game content.`,`A useful first milestone is not full cinematic playback. It is a map-aware replay viewer with scrub controls and analysis overlays.`])}
      </section>
    `:D===`github`?`
      <section>
        <h3>Warcraft III GitHub Repos To Watch</h3>
        ${Un([{label:`w3gjs`,href:`https://github.com/PBug90/w3gjs`,description:`Replay parser already used here; good foundation for deeper timeline and replay metadata features.`},{label:`WarsmashModEngine`,href:`https://github.com/Retera/WarsmashModEngine`,description:`Java Warcraft III engine project with an HTML branch/demo path; possible long-term browser replay renderer research.`},{label:`Warsmash HTML branch`,href:`https://github.com/ErikSom/WarsmashModEngine/tree/HTML`,description:`The browser-focused fork/branch behind the kind of in-browser WC3 demo we could study.`},{label:`warsmash.pages.dev`,href:`https://warsmash.pages.dev/`,description:`Live browser demo showing the engine direction is possible.`},{label:`War3Net`,href:`https://github.com/Drake53/War3Net`,description:`.NET Warcraft III map, campaign, object data, and replay tooling; useful reference for formats and extraction.`},{label:`wc3maptranslator`,href:`https://github.com/ChiefOfGxBxL/WC3MapTranslator`,description:`Warcraft III map translation/parsing utilities that could help with map metadata and object data workflows.`},{label:`wc3icons`,href:`https://wc3icons.coffbox.win/`,description:`Icon source used for local units, heroes, buildings, upgrades, and items.`}])}
      </section>
    `:`
    <section>
      <h3>Data Sources</h3>
      <p>Replays come from the local replay cache generated by the replay fetch script, then filtered to the allowed Human map pool.</p>
      <p>Replay analysis comes from locally parsed <code>.w3g</code> data using <code>w3gjs</code>: players, races, APM, build order, upgrades, shop items, found items, chat, and action counts.</p>
      <p>Map drop odds come from extracted local map drop tables. If a map table is missing, the app still shows found items but avoids inventing a percentage.</p>
      <p>Player earnings are cached locally from Warcraft III earnings pages and filtered to Human player profiles, so the app is not scraping pages during normal browsing.</p>
    </section>
    <section>
      <h3>Source Links</h3>
      ${Un([{label:`Warcraft3.info replays`,href:`https://warcraft3.info/replays/`,description:`Replay search, replay metadata, downloads, map images, and source replay pages.`},{label:`Warcraft3.info Elo API`,href:`https://warcraft3.info/api/v1/stats/elo?modelType=App%5CModels%5CStats%5CStatsPlayer`,description:`Top-player ranking source used to find featured Human players.`},{label:`Liquipedia Warcraft III earnings`,href:`https://liquipedia.net/warcraft/Earnings/Total`,description:`Prize money cache source, filtered locally to Human player profiles.`},{label:`Liquipedia Warcraft API`,href:`https://liquipedia.net/warcraft/api.php`,description:`Used by the earnings script to fetch profile wikitext for race and country metadata.`},{label:`w3gjs`,href:`https://github.com/PBug90/w3gjs`,description:`Local replay parser used for analysis tabs.`},{label:`WC3 Icons`,href:`https://wc3icons.coffbox.win/`,description:`Icon pack source for local heroes, units, buildings, upgrades, and item art.`}])}
    </section>
  `,Kn=()=>`
  <button class="app-info-button" type="button" aria-label="Open app info" aria-expanded="${E}" aria-controls="app-info-panel" data-info-toggle>
    <span aria-hidden="true">i</span>
  </button>
  <aside class="app-info-panel ${E?`is-open`:``}" id="app-info-panel" aria-hidden="${!E}" aria-label="App info">
    <header class="app-info-header">
      <div>
        <p class="eyebrow">App info</p>
        <h2>How It Works</h2>
      </div>
      <button class="app-info-close" type="button" aria-label="Close app info" data-info-close>×</button>
    </header>
    <div class="app-info-tabs" role="tablist" aria-label="App info sections">
      ${xe.map(e=>`
            <button class="${e.id===D?`is-active`:``}" type="button" role="tab" aria-selected="${e.id===D}" data-info-tab="${N(e.id)}">
              ${N(e.label)}
            </button>
          `).join(``)}
    </div>
    <div class="app-info-body">
      ${Gn()}
    </div>
  </aside>
`,qn=()=>`
  <footer class="site-footer">
    <div class="site-footer-inner">
      <span class="footer-bnet-tag" aria-label="Battle.net tag Jamie#12461">
        <img src="${e}" alt="" aria-hidden="true" />
        <span>Jamie#12461</span>
      </span>
      <a class="footer-github-link" href="https://github.com/dottereldesign" target="_blank" rel="noreferrer" aria-label="Open dottereldesign on GitHub">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.77.6-3.36-1.18-3.36-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.21-.25-4.54-1.11-4.54-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.4 9.4 0 0 1 12 6.02c.85 0 1.7.11 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.67-4.56 4.92.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
        </svg>
        <span>dottereldesign</span>
      </a>
      <span class="footer-ai-note">Portrait and visual accent images created with AI-assisted tools.</span>
    </div>
  </footer>
`,Jn=()=>{document.querySelector(`[data-info-toggle]`)?.addEventListener(`click`,()=>{E=!E,Q()}),document.querySelector(`[data-info-close]`)?.addEventListener(`click`,()=>{E=!1,Q()}),document.querySelectorAll(`[data-info-tab]`).forEach(e=>{e.addEventListener(`click`,()=>{D=e.dataset.infoTab||`sources`,Q()})})},Yn=()=>{document.querySelector(`[data-warsmash-embed]`)?.addEventListener(`click`,()=>{O=!0,Q()}),document.querySelectorAll(`[data-warsmash-watch]`).forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),b=null,T=`overview`,O=!0,Q()})}),document.querySelectorAll(`[data-warsmash-edition]`).forEach(e=>{e.addEventListener(`click`,()=>{k=e.dataset.warsmashEdition||`legacy`,localStorage.setItem(`wc3-warsmash-selected-edition`,k),O=!1,Q()})}),document.querySelectorAll(`[data-warsmash-auto-stage]`).forEach(e=>{e.addEventListener(`click`,()=>{gn(k)})}),document.querySelector(`[data-reforged-prepare]`)?.addEventListener(`click`,()=>{_n()})},Xn=()=>{me=`${navigator.userAgent||``} ${navigator.platform||``}`.toLowerCase().includes(`win`)?`windows`:`mac`},Q=()=>{let e=je();document.querySelector(`#app`).innerHTML=`
    <header class="site-header">
      <a class="brand ${_e?``:`with-logo-intro`}" href="#/" aria-label="Human vs The World home">
        <img src="${l}" alt="Human vs The World" />
      </a>
      <button class="menu-button" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-menu">
        <span class="menu-button-icon" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </header>

    <aside class="menu-panel" id="site-menu" aria-hidden="true">
      <div class="menu-panel-inner">
        <p class="eyebrow">Browse</p>
        <nav class="menu-nav" aria-label="Menu">
          ${Xt(e.type===`all`?`is-active`:``)}
          ${Zt(e.type===`builds`?`is-active`:``)}
          ${Qt(e.type===`player-earnings`?`is-active`:``)}
          ${$t(e.type===`statistics`?`is-active`:``)}
          ${en(e.type===`resources`?`is-active`:``)}
        </nav>
        
      </div>
    </aside>

    <main class="page-shell">
      ${e.type===`builds`?ln():e.type===`player-earnings`?kn():e.type===`statistics`?bn():e.type===`renderer`?un():e.type===`wc3-replay-viewer`?vn():e.type===`w3gjs`?wn():e.type===`resources`?On():cn()}
    </main>
    ${qn()}

    ${Ft()}
    ${Bt()}
    ${Kn()}
  `;let t=document.querySelector(`.site-header`),n=document.querySelector(`.menu-panel`),r=document.querySelector(`.menu-button`),i=()=>{n.classList.remove(`is-open`),n.setAttribute(`aria-hidden`,`true`),r.setAttribute(`aria-expanded`,`false`),r.setAttribute(`aria-label`,`Open menu`)};r.addEventListener(`click`,()=>{let e=n.classList.toggle(`is-open`);n.setAttribute(`aria-hidden`,String(!e)),r.setAttribute(`aria-expanded`,String(e)),r.setAttribute(`aria-label`,e?`Close menu`:`Open menu`)}),document.querySelectorAll(`[data-page-link]`).forEach(e=>{e.addEventListener(`click`,i)}),document.documentElement.style.setProperty(`--header-height`,`${t.offsetHeight}px`),Zn(),Vn(),Ln(),zn(),Bn(),Hn(),Jn(),Yn(),document.querySelector(`.player-card-region.with-card-intro`)&&!ge&&(ge=window.setTimeout(()=>{he=!0,document.querySelector(`.player-card-region.with-card-intro`)?.classList.remove(`with-card-intro`)},5200)),document.querySelector(`.brand.with-logo-intro`)&&!ve&&(ve=window.setTimeout(()=>{_e=!0,document.querySelector(`.brand.with-logo-intro`)?.classList.remove(`with-logo-intro`)},1400))};window.addEventListener(`keydown`,e=>{if(e.key!==`Escape`)return;if(x){Lt();return}if(E){E=!1,Q();return}if(b){Rn();return}Fn();let t=document.querySelector(`.menu-panel`),n=document.querySelector(`.menu-button`);!t||!n||(t.classList.remove(`is-open`),t.setAttribute(`aria-hidden`,`true`),n.setAttribute(`aria-expanded`,`false`),n.setAttribute(`aria-label`,`Open menu`))}),window.addEventListener(`click`,()=>{Fn()}),window.addEventListener(`hashchange`,()=>{O=!1,w&&=(clearInterval(w),null),x=null,S=!1,C=0,h=`all`,g=`all`,_=`all`,v=`all`,jn(),Q()}),window.addEventListener(`message`,e=>{if(e.origin!==window.location.origin)return;let t=e.data;if(!t||typeof t!=`object`||t.kind!==`hvtw-replay-request`)return;let n=t.replayKey||``;Fe(n)&&(b=null,T=`overview`,Rt(n))}),window.addEventListener(`resize`,()=>{let e=document.querySelector(`.site-header`);e&&document.documentElement.style.setProperty(`--header-height`,`${e.offsetHeight}px`)}),window.addEventListener(`focus`,()=>{je().type===`wc3-replay-viewer`&&!O&&Q()}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&je().type===`wc3-replay-viewer`&&!O&&Q()});var Zn=()=>{document.body.classList.toggle(`has-scrolled-header`,window.scrollY>32)};window.addEventListener(`scroll`,Zn,{passive:!0});var $=async e=>{let t=await fetch(e,{cache:`no-store`});if(!t.ok)throw Error(`HTTP ${t.status}`);return t.json()};(async()=>{Xn();let e=Promise.resolve(null),[t,n,r,i,a,o]=await Promise.allSettled([$(`replays.json`),$(`rankings.json`),$(`replay-analysis.json`),$(`map-drop-tables.json`),$(`liquipedia-human-earnings.json`),e]);t.status===`fulfilled`?p=t.value:le=t.reason?.message||`Replay cache unavailable`,n.status===`fulfilled`&&(fe=n.value),r.status===`fulfilled`&&(ue=r.value),i.status===`fulfilled`&&(de=i.value),a.status===`fulfilled`&&(m=a.value),Q()})();