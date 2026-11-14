import re

def replace_seq(path, pairs):
    # pairs: list of (old, new) applied sequentially, each replacing first occurrence
    s = open(path, encoding='utf-8').read()
    for old, new in pairs:
        assert old in s, f"NOT FOUND: {old}"
        s = s.replace(old, new, 1)
    open(path, 'w', encoding='utf-8').write(s)
    print("updated", path)

# VehiclesSeeder
replace_seq(r'G:\HASAD\hasad-backend\database\seeders\VehiclesSeeder.php', [
    ("'photos' => [$m . 'agri_tractor.png'],\n                'attachments' => [32, 33],", "'photos' => [$m . 'jd_6120m.png'],\n                'attachments' => [32, 33],"),
    ("'photos' => [$m . 'agri_tractor.png'],\n                'attachments' => [32],", "'photos' => [$m . 'kubota_m5091.png'],\n                'attachments' => [32],"),
    ("'photos' => [$m . 'combine_harvester.png'],\n            ],\n            [\n                'category_id' => 2, 'sub_category_id' => 7,", "'photos' => [$m . 'claas_lexion.png'],\n            ],\n            [\n                'category_id' => 2, 'sub_category_id' => 7,"),
    ("'photos' => [$m . 'combine_harvester.png'],", "'photos' => [$m . 'nh_cr890.png'],"),
    ("'photos' => [$m . 'ensileuse.png'],", "'photos' => [$m . 'jd_8600i.png'],"),
    ("'photos' => [$m . 'crop_sprayer.png'],", "'photos' => [$m . 'case_patriot.png'],"),
    ("'photos' => [$m . 'telehandler.png'],", "'photos' => [$m . 'manitou_mlt.png'],"),
    ("'photos' => [$m . 'mini-loader.png'],", "'photos' => [$m . 'jcb_416s.png'],"),
    ("'photos' => [$m . 'agri_trailer.png'],", "'photos' => [$m . 'krone_tx460.png'],"),
    ("'photos' => [$m . 'potato-harvester.png'],", "'photos' => [$m . 'grimme_se.png'],"),
    ("'photos' => [$m . 'motoculteur.png'],", "'photos' => [$m . 'husqvarna_t600.png'],"),
    ("'photos' => [$m . 'pickup.png'],", "'photos' => [$m . 'polaris_ranger.png'],"),
])

# EquipmentsSeeder
replace_seq(r'G:\HASAD\hasad-backend\database\seeders\EquipmentsSeeder.php', [
    ("'photos' => [$m . 'plough_cultivator.png'],", "'photos' => [$m . 'lemken_juwel.png'],"),
    ("'photos' => [$m . 'rotary-tiller.png'],", "'photos' => [$m . 'kuhn_hr4004.png'],"),
    ("'photos' => [$m . 'seeder_planter.png'],\n            ],\n            [\n                'category_id' => 2, 'sub_category_id' => 7,", "'photos' => [$m . 'vaderstad_tempo.png'],\n            ],\n            [\n                'category_id' => 2, 'sub_category_id' => 7,"),
    ("'photos' => [$m . 'seeder_planter.png'],", "'photos' => [$m . 'checchi_wolf.png'],"),
    ("'photos' => [$m . 'crop_sprayer.png'],\n            ],\n            [\n                'category_id' => 3, 'sub_category_id' => 10,", "'photos' => [$m . 'amazone_ux.png'],\n            ],\n            [\n                'category_id' => 3, 'sub_category_id' => 10,"),
    ("'photos' => [$m . 'crop_sprayer.png'],", "'photos' => [$m . 'rauch_axis.png'],"),
    ("'photos' => [$m . 'hay_baler.png'],\n            ],\n            [\n                'category_id' => 4, 'sub_category_id' => 14,", "'photos' => [$m . 'krone_easycut.png'],\n            ],\n            [\n                'category_id' => 4, 'sub_category_id' => 14,"),
    ("'photos' => [$m . 'hay_baler.png'],", "'photos' => [$m . 'nh_rollbelt.png'],"),
    ("'photos' => [$m . 'irrigation_gear.png'],", "'photos' => [$m . 'irrifrance_optima.png'],"),
    ("'photos' => [$m . 'combine_harvester.png'],", "'photos' => [$m . 'claas_dominator.png'],"),
    ("'photos' => [$m . 'mini-loader.png'],", "'photos' => [$m . 'manitou_mi25.png'],"),
    ("'photos' => [$m . 'feed-mixer.png'],", "'photos' => [$m . 'kuhn_profile.png'],"),
    ("'photos' => [$m . 'greenhouse.png'],", "'photos' => [$m . 'richel_serre.png'],"),
])

# AttachmentsSeeder
replace_seq(r'G:\HASAD\hasad-backend\database\seeders\AttachmentsSeeder.php', [
    ("'photos' => [$m . 'implements.png'],\n            ],\n            [\n                'sub_category_id' => 33,", "'photos' => [$m . 'lemken_charrue.png'],\n            ],\n            [\n                'sub_category_id' => 33,"),
    ("'photos' => [$m . 'implements.png'],\n            ],\n            [\n                'sub_category_id' => 34,", "'photos' => [$m . 'kuhn_harrow.png'],\n            ],\n            [\n                'sub_category_id' => 34,"),
    ("'photos' => [$m . 'implements.png'],\n            ],\n            [\n                'sub_category_id' => 35,", "'photos' => [$m . 'manitou_bucket.png'],\n            ],\n            [\n                'sub_category_id' => 35,"),
    ("'photos' => [$m . 'implements.png'],\n            ],\n            [\n                'sub_category_id' => 37,", "'photos' => [$m . 'jcb_balefork.png'],\n            ],\n            [\n                'sub_category_id' => 37,"),
    ("'photos' => [$m . 'rotary-tiller.png'],", "'photos' => [$m . 'kuhn_mulcher.png'],"),
    ("'photos' => [$m . 'implements.png'],", "'photos' => [$m . 'auger_tariere.png'],"),
])
print("ALL SEEDERS UPDATED")
