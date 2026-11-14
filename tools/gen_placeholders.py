from PIL import Image, ImageDraw

DARK = (1, 52, 29, 255)      # #01341D
ACCENT = (111, 203, 59, 255) # #6FCB3B
LIGHT = (234, 246, 236, 255) # #EAF6EC

S = 4  # supersample factor


def canvas(w, h):
    img = Image.new('RGBA', (w * S, h * S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, w * S - 1, h * S - 1], radius=40 * S, fill=LIGHT)
    return img, d


def sc(*v):
    return [x * S for x in v]


# ---------------- no_image_available.png (600x450) ----------------
w, h = 600, 450
img, d = canvas(w, h)
# photo frame
d.rounded_rectangle(sc(140, 90, 460, 330), radius=18 * S, outline=DARK, width=12 * S)
# sun
d.ellipse(sc(196, 132, 248, 184), fill=ACCENT)
# mountains
d.polygon([(x * S, y * S) for x, y in [(168, 318), (286, 186), (404, 318)]], fill=ACCENT)
d.polygon([(x * S, y * S) for x, y in [(300, 318), (376, 232), (448, 318)]], fill=DARK)
# ground line inside frame
d.line(sc(140, 318, 460, 318), fill=DARK, width=6 * S)
img.resize((w, h), Image.LANCZOS).save(
    r'G:\HASAD\hasad-app\assets\images\no_image_available.png')

# ---------------- notify_icon.png (600x600) ----------------
w, h = 600, 600
img, d = canvas(w, h)
# bell dome
d.ellipse(sc(212, 168, 388, 330), fill=DARK)
# bell body
d.rectangle(sc(212, 240, 388, 388), fill=DARK)
# bell rim
d.rounded_rectangle(sc(190, 368, 410, 410), radius=20 * S, fill=DARK)
# clapper
d.ellipse(sc(272, 404, 328, 460), fill=DARK)
# accent highlight on dome
d.arc(sc(236, 190, 364, 316), start=200, end=340, fill=ACCENT, width=14 * S)
# handle
d.rounded_rectangle(sc(282, 130, 318, 180), radius=10 * S, fill=DARK)
img.resize((w, h), Image.LANCZOS).save(
    r'G:\HASAD\hasad-app\assets\images\notify_icon.png')

for name in ('no_image_available.png', 'notify_icon.png'):
    p = r'G:\HASAD\hasad-app\assets\images' + '\\' + name
    im = Image.open(p)
    print(name, im.size, im.mode)
