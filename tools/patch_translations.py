import re

p = r'G:\HASAD\hasad-app\lib\core\localization\translations.dart'
t = open(p, encoding='utf-8').read()

pairs = [
    # ---- Arabic ----
    ('"addequipmentcat1": "أدوات البناء"', '"addequipmentcat1": "الآلات الزراعية"'),
    ('"addequipmentsubcat1": "آلات تحريك التربة"', '"addequipmentsubcat1": "الحراثة والعزق"'),
    ('"addequipmentsubcat2": "تقطيع وحفر"', '"addequipmentsubcat2": "البذار والغرس"'),
    ('"addequipmentsubcat3": "الرافعات والشاحنات"', '"addequipmentsubcat3": "الرش والتسميد"'),
    ('"addequipmentsubcat4": "تفريغ الشاحنات والصهاريج"', '"addequipmentsubcat4": "الحصاد والدرس"'),
    ('"addequipmentsubcat5": "ماكينات الخرسانة"', '"addequipmentsubcat5": "الري والضخ"'),
    ('"addequipmentcat2": "بناء المركبات"', '"addequipmentcat2": "المركبات الزراعية"'),
    ('"addequipmentsubcat6": "فئة فرعية"', '"addequipmentsubcat6": "فئة فرعية"'),
    ('"addequipmentcat3": "المرفقات"', '"addequipmentcat3": "الأدوات والملحقات"'),
    ('"searchtext": \'جرب البحث عن الشاحن\'', '"searchtext": \'جرب البحث عن الجرار\''),
    ('"onboardingbody1": "\\nتأخر المشروع بسبب عدم توفر المعدات"',
     '"onboardingbody1": "\\nتأخر العمل الزراعي بسبب عدم توفر الآلات"'),
    ('"onboardingbody2": "\\nعمليات طويلة للعثور على المعدات واستئجارها"',
     '"onboardingbody2": "\\nعمليات طويلة للعثور على الآلات واستئجارها"'),
    ('"onboardingbody3":\n              "\\nركن السيارة في الأماكن الخطرة والتعامل مع الظروف الجوية السيئة"',
     '"onboardingbody3":\n              "\\nفقدان المحاصيل بسبب تأخر الحصاد وتردي الأحوال الجوية"'),
    ('"loginHeadline1": "معدات البناء بين يديك"', '"loginHeadline1": "الآلات الزراعية بين يديك"'),
    ('"loginHeadline2": "ابحث عن أي معدات\\nواستأجرها بسهولة\\nحتى باب منزلك"',
     '"loginHeadline2": "ابحث عن أي آلة زراعية\\nواستأجرها بسهولة\\nحتى باب مزرعتك"'),
    ('"equipmentCatname1": "المعدات الثقيلة"', '"equipmentCatname1": "المركبات الزراعية"'),
    ('"equipmentCatname2": "المعدات الخفيفة"', '"equipmentCatname2": "المعدات الزراعية"'),
    ('"Attachments": "المرفقات :"', '"Attachments": "الأدوات :"'),
    ('"Vehicles": "المركبات :"', '"Vehicles": "المركبات الزراعية :"'),
    ('"equipments": "المعدات :"', '"equipments": "المعدات الزراعية :"'),

    # ---- French ----
    ('"addequipmentcat1": "Construction Equipments"', '"addequipmentcat1": "Matériel agricole"'),
    ('"addequipmentsubcat1": "Machines de terrassement"', '"addequipmentsubcat1": "Travail du sol"'),
    ('"addequipmentsubcat2": "trancheuses et foreurs"', '"addequipmentsubcat2": "Semoirs et plantation"'),
    ('"addequipmentsubcat3": "Grues et sur camions"', '"addequipmentsubcat3": "Pulvérisation et épandage"'),
    ('"addequipmentsubcat4": "Camions à benne et citerne"', '"addequipmentsubcat4": "Fenaison et pressage"'),
    ('"addequipmentsubcat5": "Machines à béton"', '"addequipmentsubcat5": "Irrigation et pompage"'),
    ('"addequipmentcat2": "Construction véhicules"', '"addequipmentcat2": "Véhicules agricoles"'),
    ('"addequipmentcat3": "attachements"', '"addequipmentcat3": "Outils et accessoires"'),
    ('"ajouteattachementtext": "Ajoute attachements"', '"ajouteattachementtext": "Ajouter des outils"'),
    ('"searchtext": \'Essayez "Chargeur"\'', '"searchtext": \'Essayez "Tracteur"\''),
    ('"onboardingbody1":\n              "Retards du projet dû à l\'indisponibilité des équipements.\\n"',
     '"onboardingbody1":\n              "Retards des travaux agricoles dus à l\'indisponibilité des machines.\\n"'),
    ('"onboardingbody2":\n              "Processus longs pour trouver et louer du matériel.\\n"',
     '"onboardingbody2":\n              "Processus longs pour trouver et louer une machine agricole.\\n"'),
    ('"onboardingbody3":\n              "Stationner dans des endroits à risque et faire face aux mauvaises conditions météorologiques.\\n"',
     '"onboardingbody3":\n              "Pertes de récolte dues aux retards et aux mauvaises conditions météorologiques.\\n"'),
    ('"loginHeadline1": "du materiel de constrcution entre vos mains"',
     '"loginHeadline1": "les machines agricoles entre vos mains"'),
    ('"loginHeadline2":\n              "Recherchez n\'importe quel equipment\\n et louez-le en toute simplicite\\n jusqu\'a chez vous"',
     '"loginHeadline2":\n              "Recherchez n\'importe quelle machine\\n et louez-la en toute simplicité\\n jusqu\'à votre ferme"'),
    ('"equipmentCatname1": "Véhicules Construction"', '"equipmentCatname1": "Véhicules agricoles"'),
    ('"equipmentCatname2": "Équipements de construction"', '"equipmentCatname2": "Équipements agricoles"'),
    ('"Attachments": "Attachments :"', '"Attachments": "Outils :"'),
    ('"Vehicles": "Vehicles :"', '"Vehicles": "Véhicules :"'),
    ('"equipments": "Equipments :"', '"equipments": "Équipements :"'),
]

missing = []
for old, new in pairs:
    if old in t:
        t = t.replace(old, new)
    else:
        missing.append(old[:60])

open(p, 'w', encoding='utf-8').write(t)
print('patched', len(pairs) - len(missing), 'of', len(pairs))
for m in missing:
    print('MISS:', m)
