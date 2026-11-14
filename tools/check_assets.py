import os, re, sys

ROOT = r'G:\HASAD\hasad-app'
LIB = os.path.join(ROOT, 'lib')
ASSETS = os.path.join(ROOT, 'assets')

refs = set()
pattern = re.compile(r'["\'](assets/[^"\']+)["\']')
for dirpath, _, files in os.walk(LIB):
    for f in files:
        if not f.endswith('.dart'):
            continue
        p = os.path.join(dirpath, f)
        try:
            text = open(p, encoding='utf-8', errors='ignore').read()
        except Exception:
            continue
        for m in pattern.finditer(text):
            refs.add((m.group(1), os.path.relpath(p, ROOT)))

# dynamic references like 'assets/images/${...}.png'
dynamic = []
for dirpath, _, files in os.walk(LIB):
    for f in files:
        if not f.endswith('.dart'):
            continue
        p = os.path.join(dirpath, f)
        text = open(p, encoding='utf-8', errors='ignore').read()
        for m in re.finditer(r'["\'](assets/[^"\']*\$[^"\']*)["\']', text):
            dynamic.append((m.group(1), os.path.relpath(p, ROOT)))

missing = []
for rel, src in sorted(refs):
    if rel in ('assets/',):
        continue
    if not os.path.exists(os.path.join(ROOT, rel.replace('/', os.sep))):
        missing.append((rel, src))

print('static asset refs:', len(refs))
print('dynamic refs:', len(dynamic))
for d in dynamic:
    print('  dynamic:', d[0], '<-', d[1])
print('MISSING static assets:', len(missing))
for m in missing:
    print('  MISSING:', m[0], '<-', m[1])

# pubspec declared dirs
pub = open(os.path.join(ROOT, 'pubspec.yaml'), encoding='utf-8').read()
print('--- pubspec assets ---')
print(pub[pub.find('flutter:'):pub.find('flutter:')+600])
