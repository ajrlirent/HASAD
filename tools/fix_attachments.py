p = r'G:\HASAD\hasad-backend\database\seeders\AttachmentsSeeder.php'
s = open(p, encoding='utf-8').read()
old_imp = "'photos' => [$m . 'implements.png'],"
old_rot = "'photos' => [$m . 'rotary-tiller.png'],"
names = ['lemken_charrue.png', 'kuhn_harrow.png', 'manitou_bucket.png', 'jcb_balefork.png', 'auger_tariere.png']
# replace implements.png occurrences one by one
for n in names:
    assert old_imp in s, 'no more implements.png'
    s = s.replace(old_imp, "'photos' => [$m . '%s']," % n, 1)
# replace rotary-tiller.png
assert old_rot in s
s = s.replace(old_rot, "'photos' => [$m . 'kuhn_mulcher.png'],", 1)
open(p, 'w', encoding='utf-8').write(s)
print('done')
