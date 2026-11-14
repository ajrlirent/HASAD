import re, os

d = r'G:\HASAD\hasad-app\assets\lottie'
for f in ('empty.json', 'loading.json', 'loading2.json'):
    t = open(os.path.join(d, f), encoding='utf-8').read()
    arrs = sorted(set(re.findall(r'"c":\{"a":\d,"k":\[([^\]]+)\]', t)))
    print(f, len(t), 'colors:', arrs)
