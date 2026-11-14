from PIL import Image

for name in ['hasad_logo.png', 'hasad_logo_white.png', 'hasad_back_logo.png']:
    im = Image.open('hasad-app/assets/images/logo/' + name).convert('RGBA')
    w, h = im.size
    px = im.load()
    # column occupancy (alpha>0)
    cols = []
    for x in range(w):
        cnt = sum(1 for y in range(h) if px[x, y][3] > 10)
        cols.append(cnt)
    # find ranges of columns with content
    runs = []
    start = None
    for x, c in enumerate(cols):
        if c > 0 and start is None:
            start = x
        elif c == 0 and start is not None:
            runs.append((start, x - 1))
            start = None
    if start is not None:
        runs.append((start, w - 1))
    print(name, 'size', (w, h), 'content column runs:', runs)
    # row occupancy
    rows = []
    for y in range(h):
        cnt = sum(1 for x in range(w) if px[x, y][3] > 10)
        rows.append(cnt)
    runs_r = []
    start = None
    for y, c in enumerate(rows):
        if c > 0 and start is None:
            start = y
        elif c == 0 and start is not None:
            runs_r.append((start, y - 1))
            start = None
    if start is not None:
        runs_r.append((start, h - 1))
    print('   content row runs:', runs_r)
