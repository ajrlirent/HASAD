p = r'G:\HASAD\hasad-app\lib\data\datasource\static\static.dart'
t = open(p, encoding='utf-8').read()

old_att = '''List<AttachmentModel> attachments = [
  AttachmentModel(
      attachmentname: "Trencheuse",
      attachmentimage: "assets/images/attachments/trenchuse.png"),
  AttachmentModel(
      attachmentname: "Marteaux",
      attachmentimage: "assets/images/attachments/Marteaux.png"),
  AttachmentModel(
      attachmentname: "Tarière",
      attachmentimage: "assets/images/attachments/Tarière.png"),
  AttachmentModel(
      attachmentname: "Grand godet\\n 2 dents",
      attachmentimage: "assets/images/attachments/Godet2dents.png"),
  AttachmentModel(
      attachmentname: "Grand godet 5 dents",
      attachmentimage: "assets/images/attachments/5dents.png"),
];'''

new_att = '''List<AttachmentModel> attachments = [
  AttachmentModel(
      attachmentname: "Charrue",
      attachmentimage: "assets/images/attachments/trenchuse.png"),
  AttachmentModel(
      attachmentname: "Herse rotative",
      attachmentimage: "assets/images/attachments/Marteaux.png"),
  AttachmentModel(
      attachmentname: "Tarière",
      attachmentimage: "assets/images/attachments/Tarière.png"),
  AttachmentModel(
      attachmentname: "Godet agricole",
      attachmentimage: "assets/images/attachments/Godet2dents.png"),
  AttachmentModel(
      attachmentname: "Fourche à balles",
      attachmentimage: "assets/images/attachments/5dents.png"),
];'''

if old_att in t:
    t = t.replace(old_att, new_att)
    print('attachments replaced')
else:
    print('attachments block NOT found')

start = t.index('List<AttachmentModel> attachmentsBottomsheet = [')
end = t.index('];', start) + 2
new_sheet = '''List<AttachmentModel> attachmentsBottomsheet = [
  AttachmentModel(
      attachmentname: "Charrue",
      attachmentimage: "assets/images/attachments/trenchuse.png"),
  AttachmentModel(
      attachmentname: "Herse rotative",
      attachmentimage: "assets/images/attachments/Marteaux.png"),
  AttachmentModel(
      attachmentname: "Tarière",
      attachmentimage: "assets/images/attachments/Tarière.png"),
  AttachmentModel(
      attachmentname: "Godet agricole",
      attachmentimage: "assets/images/attachments/Godet2dents.png"),
  AttachmentModel(
      attachmentname: "Fourche à balles",
      attachmentimage: "assets/images/attachments/5dents.png"),
  AttachmentModel(
      attachmentname: "Gyrobroyeur",
      attachmentimage: "assets/images/attachments/Marteaux.png"),
];'''
t = t[:start] + new_sheet + t[end:]

# the "add" form static sections -> agricultural labels
t = t.replace('''      [
        AddEntry("addequipmentsubcat1"),
        AddEntry("addequipmentsubcat2"),
        AddEntry("addequipmentsubcat3"),
        AddEntry("addequipmentsubcat4"),
        AddEntry("addequipmentsubcat5"),
      ],''', '''      [
        AddEntry("addequipmentsubcat1"),
        AddEntry("addequipmentsubcat2"),
        AddEntry("addequipmentsubcat3"),
        AddEntry("addequipmentsubcat4"),
        AddEntry("addequipmentsubcat5"),
      ],''')

open(p, 'w', encoding='utf-8').write(t)
print('static.dart updated')
