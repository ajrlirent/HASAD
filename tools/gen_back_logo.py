from PIL import Image, ImageDraw

SRC = r'G:\HASAD\hasad-app\assets\images\logo\hasad_logo.png'
OUT = r'G:\HASAD\hasad-app\assets\images\logo\hasad_back_logo.png'
DARK = (1, 52, 29, 255)

W, H = 720, 200
img = Image.new('RGBA', (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(img)

# back arrow (line + chevron), rounded ends
lw = 18
d.line([(36, 100), (150, 100)], fill=DARK, width=lw)
d.line([(36, 100), (84, 52)], fill=DARK, width=lw)
d.line([(36, 100), (84, 148)], fill=DARK, width=lw)
r = lw // 2
for cx, cy in [(36, 100), (84, 52), (84, 148), (150, 100)]:
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=DARK)

logo = Image.open(SRC).convert('RGBA')
target_h = 118
target_w = round(logo.width * target_h / logo.height)
logo = logo.resize((target_w, target_h), Image.LANCZOS)
img.alpha_composite(logo, (196, (H - target_h) // 2))

img.save(OUT)
im = Image.open(OUT)
print('saved', OUT, im.size, 'bbox', im.getchannel('A').getbbox())
