import os, re, shutil

ADMIN = r'G:\HASAD\hasad-admin'
SRC = os.path.join(ADMIN, 'src')
APP = r'G:\HASAD\hasad-app'

# 1) logo asset: white HASAD wordmark used on the dark green sidebar
src_logo = os.path.join(APP, 'assets', 'images', 'logo', 'hasad_logo_white.png')
dst_logo = os.path.join(ADMIN, 'public', 'hasad-logo.png')
shutil.copyfile(src_logo, dst_logo)

# 2) replace amber-* tokens with hasad-* (palette declared in tailwind.config.ts)
count = 0
for root, dirs, files in os.walk(SRC):
    for f in files:
        if not f.endswith(('.tsx', '.ts', '.css', '.svg')):
            continue
        p = os.path.join(root, f)
        t = open(p, encoding='utf-8', errors='surrogateescape').read()
        nt = t.replace('amber-', 'hasad-')
        if nt != t:
            open(p, 'w', encoding='utf-8', errors='surrogateescape').write(nt)
            count += 1
print('colour tokens updated in', count, 'files')

# 3) logo references
for root, dirs, files in os.walk(SRC):
    for f in files:
        if not f.endswith(('.tsx', '.ts')):
            continue
        p = os.path.join(root, f)
        t = open(p, encoding='utf-8').read()
        nt = t.replace('"/ajrli.svg"', '"/hasad-logo.png"')
        if nt != t:
            open(p, 'w', encoding='utf-8').write(nt)
            print('logo ref fixed', p)

# 4) titles / copy
p = os.path.join(SRC, 'app', 'layout.tsx')
t = open(p, encoding='utf-8').read().replace('"AJRLI Admin Panel"', '"HASAD Admin Panel"')
open(p, 'w', encoding='utf-8').write(t)

p = os.path.join(SRC, 'app', 'page.tsx')
t = open(p, encoding='utf-8').read().replace("Welcome to AJRLI&apos;s Admin Panel", "Welcome to HASAD&apos;s Admin Panel")
open(p, 'w', encoding='utf-8').write(t)

# 5) package name
p = os.path.join(ADMIN, 'package.json')
t = open(p, encoding='utf-8').read().replace('"ajrli-admin-panel"', '"hasad-admin-panel"')
open(p, 'w', encoding='utf-8').write(t)

# 6) API + storage URLs -> local Laravel backend
p = os.path.join(SRC, 'lib', 'axios.ts')
t = open(p, encoding='utf-8').read().replace('"http://209.38.225.231"', '"http://192.168.1.7:8000"')
open(p, 'w', encoding='utf-8').write(t)

p = os.path.join(SRC, 'lib', 'utils.ts')
t = open(p, encoding='utf-8').read().replace('`http://209.38.225.231/storage${modifiedUrl}`', '`http://192.168.1.7:8000/storage${modifiedUrl}`')
open(p, 'w', encoding='utf-8').write(t)

print('admin text/url rebrand done')
