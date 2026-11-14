import os
os.makedirs(r'G:\HASAD\tools\vector', exist_ok=True)
G='#5DBB46'; DG='#2F7D32'; MG='#37423B'; GL='#DDF3CE'; TY='#2B2F2C'; HUB='#C7CEC8'
def svg(body, w=1000, h=700):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">{body}</svg>'

tele = f'''
<g>
  <path d="M500 370 L840 190 L862 230 L520 410 Z" fill="{DG}"/>
  <path d="M520 390 L800 250" stroke="{MG}" stroke-width="10"/>
  <path d="M840 190 L900 158 L918 192 L858 224 Z" fill="{MG}"/>
  <path d="M900 158 L958 150 L958 214 L918 220 Z" fill="{MG}"/>
  <path d="M900 160 L900 216 M916 158 L916 218 M932 156 L932 219 M948 153 L948 220" stroke="{GL}" stroke-width="5"/>
  <rect x="290" y="400" width="400" height="95" rx="22" fill="{G}"/>
  <rect x="280" y="330" width="160" height="95" rx="18" fill="{DG}"/>
  <rect x="470" y="240" width="185" height="185" rx="16" fill="{G}"/>
  <rect x="492" y="262" width="142" height="82" rx="8" fill="{GL}"/>
  <rect x="492" y="356" width="142" height="50" rx="8" fill="{GL}" opacity="0.75"/>
  <rect x="582" y="240" width="73" height="185" fill="{DG}" opacity="0.35"/>
  <rect x="290" y="300" width="24" height="56" rx="7" fill="{MG}"/>
  <path d="M300 540 Q300 452 340 452 Q380 452 380 540 Z" fill="{DG}"/>
  <path d="M300 540 Q300 452 340 452 Q380 452 380 540 Z" fill="none" stroke="{MG}" stroke-width="6"/>
  <circle cx="340" cy="512" r="66" fill="{TY}"/><circle cx="340" cy="512" r="30" fill="{HUB}"/><circle cx="340" cy="512" r="12" fill="{MG}"/>
  <path d="M600 540 Q600 452 645 452 Q690 452 690 540 Z" fill="{DG}"/>
  <circle cx="645" cy="512" r="66" fill="{TY}"/><circle cx="645" cy="512" r="30" fill="{HUB}"/><circle cx="645" cy="512" r="12" fill="{MG}"/>
  <circle cx="480" cy="330" r="16" fill="{MG}"/>
</g>'''
open(r'G:\HASAD\tools\vector\telehandler.svg','w',encoding='utf-8').write(svg(tele))

loader = f'''
<g>
  <rect x="320" y="330" width="300" height="145" rx="30" fill="{G}"/>
  <rect x="300" y="300" width="90" height="150" rx="20" fill="{DG}"/>
  <rect x="390" y="215" width="165" height="140" rx="14" fill="{G}"/>
  <rect x="412" y="236" width="121" height="66" rx="8" fill="{GL}"/>
  <rect x="412" y="312" width="121" height="30" rx="6" fill="{GL}" opacity="0.7"/>
  <path d="M600 365 L760 400 L760 440 L600 420 Z" fill="{DG}"/>
  <path d="M760 395 L870 430 L870 505 L760 470 Z" fill="{G}"/>
  <path d="M862 428 L900 440 L900 500 L862 502 Z" fill="{MG}"/>
  <path d="M760 470 L870 505" stroke="{MG}" stroke-width="8"/>
  <path d="M360 540 Q360 455 405 455 Q450 455 450 540 Z" fill="{DG}"/>
  <circle cx="405" cy="510" r="68" fill="{TY}"/><circle cx="405" cy="510" r="28" fill="{HUB}"/><circle cx="405" cy="510" r="11" fill="{MG}"/>
  <path d="M560 540 Q560 455 608 455 Q656 455 656 540 Z" fill="{DG}"/>
  <circle cx="608" cy="510" r="68" fill="{TY}"/><circle cx="608" cy="510" r="28" fill="{HUB}"/><circle cx="608" cy="510" r="11" fill="{MG}"/>
  <rect x="470" y="360" width="20" height="80" rx="6" fill="{MG}"/>
</g>'''
open(r'G:\HASAD\tools\vector\mini-loader.svg','w',encoding='utf-8').write(svg(loader))

forage = f'''
<g>
  <path d="M700 250 C780 230 840 180 905 128 L935 170 C862 222 800 268 720 292 Z" fill="{DG}"/>
  <rect x="330" y="250" width="420" height="210" rx="16" fill="{G}"/>
  <rect x="640" y="170" width="205" height="180" rx="14" fill="{G}"/>
  <rect x="662" y="192" width="160" height="76" rx="8" fill="{GL}"/>
  <rect x="662" y="284" width="160" height="48" rx="8" fill="{GL}" opacity="0.7"/>
  <rect x="340" y="205" width="280" height="55" rx="10" fill="{DG}"/>
  <path d="M200 470 L340 470 L340 560 L200 560 Z" fill="{DG}"/>
  <rect x="170" y="455" width="240" height="85" rx="10" fill="{G}"/>
  <path d="M180 540 L190 585 L200 540 Z M215 540 L225 585 L235 540 Z M250 540 L260 585 L270 540 Z M285 540 L295 585 L305 540 Z M320 540 L330 585 L340 540 Z M355 540 L365 585 L375 540 Z" fill="{MG}"/>
  <circle cx="290" cy="465" r="34" fill="none" stroke="{MG}" stroke-width="9"/>
  <path d="M290 431 L290 499 M256 465 L324 465 M266 441 L314 489 M314 441 L266 489" stroke="{MG}" stroke-width="5"/>
  <path d="M250 450 L340 355 L390 380 L320 470 Z" fill="{DG}"/>
  <path d="M380 540 Q380 450 430 450 Q480 450 480 540 Z" fill="{DG}"/>
  <circle cx="430" cy="508" r="72" fill="{TY}"/><circle cx="430" cy="508" r="30" fill="{HUB}"/><circle cx="430" cy="508" r="12" fill="{MG}"/>
  <path d="M600 540 Q600 450 652 450 Q705 450 705 540 Z" fill="{DG}"/>
  <circle cx="652" cy="508" r="76" fill="{TY}"/><circle cx="652" cy="508" r="32" fill="{HUB}"/><circle cx="652" cy="508" r="13" fill="{MG}"/>
  <rect x="330" y="300" width="30" height="70" rx="8" fill="{MG}"/>
</g>'''
open(r'G:\HASAD\tools\vector\ensileuse.svg','w',encoding='utf-8').write(svg(forage))

mixer = f'''
<g>
  <path d="M250 420 L330 430 L330 470 L250 470 Z" fill="{MG}"/>
  <path d="M310 270 L760 270 L720 520 L350 520 Z" fill="{G}"/>
  <path d="M310 270 L760 270 L752 310 L318 310 Z" fill="{DG}"/>
  <circle cx="455" cy="410" r="58" fill="{DG}"/><circle cx="455" cy="410" r="26" fill="{G}"/>
  <path d="M405 410 A50 50 0 0 1 505 410" fill="none" stroke="{MG}" stroke-width="7"/>
  <path d="M505 410 A50 50 0 0 1 405 410" fill="none" stroke="{MG}" stroke-width="7" transform="rotate(90 455 410)"/>
  <circle cx="620" cy="410" r="58" fill="{DG}"/><circle cx="620" cy="410" r="26" fill="{G}"/>
  <path d="M570 410 A50 50 0 0 1 670 410" fill="none" stroke="{MG}" stroke-width="7"/>
  <path d="M670 410 A50 50 0 0 1 570 410" fill="none" stroke="{MG}" stroke-width="7" transform="rotate(90 620 410)"/>
  <path d="M720 430 L880 470 L872 505 L712 470 Z" fill="{DG}"/>
  <rect x="352" y="530" width="190" height="26" rx="10" fill="{MG}"/>
  <circle cx="410" cy="540" r="52" fill="{TY}"/><circle cx="410" cy="540" r="22" fill="{HUB}"/><circle cx="410" cy="540" r="9" fill="{MG}"/>
  <circle cx="620" cy="540" r="52" fill="{TY}"/><circle cx="620" cy="540" r="22" fill="{HUB}"/><circle cx="620" cy="540" r="9" fill="{MG}"/>
</g>'''
open(r'G:\HASAD\tools\vector\feed-mixer.svg','w',encoding='utf-8').write(svg(mixer))

green = f'''
<g>
  <rect x="210" y="520" width="580" height="36" rx="8" fill="{DG}"/>
  <path d="M240 520 L240 340 Q500 130 760 340 L760 520 Z" fill="{GL}" opacity="0.45"/>
  <path d="M240 520 L240 340 Q500 130 760 340 L760 520" fill="none" stroke="{G}" stroke-width="18"/>
  <path d="M300 520 L300 322 Q500 172 700 322 L700 520" fill="none" stroke="{G}" stroke-width="10"/>
  <path d="M370 520 L370 268 Q500 188 630 268 L630 520" fill="none" stroke="{G}" stroke-width="8"/>
  <path d="M240 400 L760 400" stroke="{G}" stroke-width="9"/>
  <path d="M240 460 L760 460" stroke="{G}" stroke-width="7"/>
  <path d="M330 520 L330 400 M430 520 L430 400 M530 520 L530 400 M630 520 L630 400 M730 520 L730 400" stroke="{G}" stroke-width="6"/>
  <rect x="455" y="430" width="90" height="90" rx="4" fill="{G}"/>
  <rect x="466" y="441" width="68" height="79" rx="3" fill="{GL}"/>
  <rect x="230" y="556" width="540" height="16" rx="6" fill="{MG}" opacity="0.55"/>
</g>'''
open(r'G:\HASAD\tools\vector\greenhouse.svg','w',encoding='utf-8').write(svg(green))

moto = f'''
<g>
  <rect x="410" y="330" width="210" height="160" rx="18" fill="{G}"/>
  <rect x="435" y="285" width="155" height="55" rx="16" fill="{DG}"/>
  <rect x="450" y="240" width="90" height="50" rx="10" fill="{MG}"/>
  <rect x="610" y="200" width="16" height="90" rx="7" fill="{MG}" transform="rotate(35 618 245)"/>
  <path d="M590 340 L770 230" stroke="{MG}" stroke-width="16" stroke-linecap="round"/>
  <path d="M595 372 L790 268" stroke="{MG}" stroke-width="16" stroke-linecap="round"/>
  <rect x="756" y="218" width="46" height="22" rx="10" fill="{TY}" transform="rotate(-30 779 229)"/>
  <rect x="776" y="256" width="46" height="22" rx="10" fill="{TY}" transform="rotate(-30 799 267)"/>
  <path d="M330 480 Q330 430 380 430 Q430 430 430 480 L430 520 L330 520 Z" fill="{DG}"/>
  <path d="M320 480 L310 530 L328 530 L338 486 Z M352 484 L346 536 L364 536 L370 490 Z" fill="{MG}"/>
  <circle cx="410" cy="500" r="72" fill="{TY}"/><circle cx="410" cy="500" r="32" fill="{HUB}"/><circle cx="410" cy="500" r="12" fill="{MG}"/>
  <circle cx="610" cy="520" r="42" fill="{TY}"/><circle cx="610" cy="520" r="17" fill="{HUB}"/>
  <path d="M470 330 L490 260" stroke="{MG}" stroke-width="12" stroke-linecap="round"/>
</g>'''
open(r'G:\HASAD\tools\vector\motoculteur.svg','w',encoding='utf-8').write(svg(moto))

pickup = f'''
<g>
  <path d="M270 470 L270 380 L350 360 L410 285 L620 285 L650 360 L780 360 L780 470 Z" fill="{G}"/>
  <path d="M380 350 L425 300 L520 300 L520 350 Z" fill="{GL}"/>
  <path d="M535 300 L610 300 L635 350 L535 350 Z" fill="{GL}"/>
  <rect x="650" y="370" width="130" height="90" rx="6" fill="{DG}"/>
  <path d="M660 380 L770 380 L770 450 L660 450 Z" fill="{DG}" opacity="0.4"/>
  <rect x="260" y="415" width="30" height="45" rx="6" fill="{MG}"/>
  <rect x="775" y="420" width="28" height="40" rx="6" fill="{MG}"/>
  <rect x="320" y="462" width="470" height="18" rx="8" fill="{MG}"/>
  <path d="M390 540 Q390 460 440 460 Q490 460 490 540 Z" fill="{DG}"/>
  <circle cx="440" cy="512" r="66" fill="{TY}"/><circle cx="440" cy="512" r="28" fill="{HUB}"/><circle cx="440" cy="512" r="11" fill="{MG}"/>
  <path d="M650 540 Q650 460 700 460 Q750 460 750 540 Z" fill="{DG}"/>
  <circle cx="700" cy="512" r="66" fill="{TY}"/><circle cx="700" cy="512" r="28" fill="{HUB}"/><circle cx="700" cy="512" r="11" fill="{MG}"/>
  <rect x="548" y="368" width="14" height="42" rx="5" fill="{MG}"/>
</g>'''
open(r'G:\HASAD\tools\vector\pickup.svg','w',encoding='utf-8').write(svg(pickup))

tiller = f'''
<g>
  <path d="M270 360 L330 360 L330 460 L270 460 Z" fill="{MG}"/>
  <path d="M300 380 L360 380 L360 470 L300 470" fill="none" stroke="{DG}" stroke-width="18"/>
  <rect x="340" y="375" width="360" height="110" rx="22" fill="{G}"/>
  <rect x="340" y="375" width="360" height="30" rx="14" fill="{DG}"/>
  <rect x="440" y="330" width="110" height="60" rx="10" fill="{MG}"/>
  <path d="M500 375 L500 330" stroke="{MG}" stroke-width="14"/>
  <path d="M360 480 L352 530 L378 530 L384 480 Z M420 480 L414 534 L440 534 L444 480 Z M480 480 L476 536 L502 536 L504 480 Z M540 480 L538 534 L564 534 L562 480 Z M600 480 L600 530 L626 530 L622 480 Z M660 480 L662 526 L688 526 L682 480 Z" fill="{MG}"/>
  <circle cx="330" cy="540" r="44" fill="{TY}"/><circle cx="330" cy="540" r="18" fill="{HUB}"/>
  <circle cx="700" cy="540" r="44" fill="{TY}"/><circle cx="700" cy="540" r="18" fill="{HUB}"/>
  <path d="M360 470 L700 470" stroke="{DG}" stroke-width="12"/>
</g>'''
open(r'G:\HASAD\tools\vector\rotary-tiller.svg','w',encoding='utf-8').write(svg(tiller))

potato = f'''
<g>
  <path d="M360 300 L720 300 L690 520 L390 520 Z" fill="{G}"/>
  <path d="M360 300 L720 300 L712 340 L368 340 Z" fill="{DG}"/>
  <path d="M390 520 L340 560 L300 560 L330 520 Z" fill="{MG}"/>
  <path d="M180 540 L260 540 L300 500 L250 470 L180 520 Z" fill="{MG}"/>
  <path d="M200 520 L300 470 L390 390 L420 425 L320 505 L230 555 Z" fill="{DG}"/>
  <path d="M230 500 L330 430" stroke="{MG}" stroke-width="7" stroke-dasharray="14 10"/>
  <path d="M700 380 L860 330 L872 366 L712 420 Z" fill="{DG}"/>
  <rect x="380" y="520" width="230" height="24" rx="10" fill="{MG}"/>
  <circle cx="450" cy="530" r="56" fill="{TY}"/><circle cx="450" cy="530" r="24" fill="{HUB}"/><circle cx="450" cy="530" r="10" fill="{MG}"/>
  <circle cx="640" cy="530" r="56" fill="{TY}"/><circle cx="640" cy="530" r="24" fill="{HUB}"/><circle cx="640" cy="530" r="10" fill="{MG}"/>
  <path d="M560 300 L560 240 L620 240 L620 300 Z" fill="{DG}"/>
</g>'''
open(r'G:\HASAD\tools\vector\potato-harvester.svg','w',encoding='utf-8').write(svg(potato))

implements = f'''
<g>
  <g transform="translate(20,20) scale(0.55)">
    <path d="M120 300 L220 300 L220 420 L120 420 Z" fill="{MG}"/>
    <path d="M180 320 L260 320 L260 430 L180 430" fill="none" stroke="{DG}" stroke-width="24"/>
    <path d="M260 380 L470 340 L480 390 L270 430 Z" fill="{G}"/>
    <path d="M470 340 L560 330 L540 430 L480 400 Z" fill="{DG}"/>
    <path d="M470 390 L620 430 L600 490 L455 450 Z" fill="{MG}"/>
    <circle cx="320" cy="500" r="58" fill="{TY}"/><circle cx="320" cy="500" r="24" fill="{HUB}"/>
  </g>
  <g transform="translate(430,20) scale(0.55)">
    <rect x="120" y="280" width="430" height="150" rx="20" fill="{G}"/>
    <rect x="140" y="220" width="180" height="90" rx="16" fill="{DG}"/>
    <path d="M120 430 L200 500 L240 430 Z M250 430 L330 500 L370 430 Z M380 430 L460 500 L500 430 Z M510 430 L590 500 L630 430 Z" fill="{MG}"/>
    <circle cx="220" cy="500" r="62" fill="{TY}"/><circle cx="220" cy="500" r="26" fill="{HUB}"/>
    <circle cx="500" cy="500" r="62" fill="{TY}"/><circle cx="500" cy="500" r="26" fill="{HUB}"/>
    <rect x="560" y="300" width="70" height="80" rx="10" fill="{MG}"/>
  </g>
  <g transform="translate(800,180) scale(0.4)">
    <rect x="60" y="220" width="400" height="140" rx="18" fill="{G}"/>
    <rect x="90" y="160" width="150" height="80" rx="14" fill="{DG}"/>
    <path d="M60 360 L140 440 L190 360 Z M210 360 L290 440 L340 360 Z M360 360 L440 440 L490 360 Z" fill="{MG}"/>
    <circle cx="160" cy="440" r="60" fill="{TY}"/><circle cx="160" cy="440" r="24" fill="{HUB}"/>
    <circle cx="430" cy="440" r="60" fill="{TY}"/><circle cx="430" cy="440" r="24" fill="{HUB}"/>
    <path d="M460 260 L560 240 L570 280 L470 300 Z" fill="{MG}"/>
  </g>
</g>'''
open(r'G:\HASAD\tools\vector\implements.svg','w',encoding='utf-8').write(svg(implements))
print('written')
