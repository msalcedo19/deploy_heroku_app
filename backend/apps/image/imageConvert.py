from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw 
from os import listdir
import os
import shutil
import apps.email.sendMail
from io import BytesIO
from django.db import models
from apps.diseño.models import Diseño
from django.core.files.storage import FileSystemStorage

def transformImage(diseño_id, diseño_original, nombre_diseñador, fecha):
    target = '.png'
    size = 800, 600

    badFiles_directory = '../designs/badfiles/' ## Carpeta donde se dejan los archivos que no lograron ser convertidos a PNG
    processed_directory = '../designs/procesados/' ## Carpeta con los archivos ya convertidos a PNG
    source_directory, filename = os.path.split(diseño_original)
    upload_storage = FileSystemStorage(location='/home/ubuntu/Proyecto1-Grupo12/designs/')
    path = '/home/ubuntu/Proyecto1-Grupo12/designs/'

    try:
        print('Diseno a procesar: ', diseño_original)
        d = Diseño.objects.get(pk=diseño_id)

        im = Image.open(path + diseño_original)
        im = im.resize(size, Image.ANTIALIAS)

        draw = ImageDraw.Draw(im)
        font = ImageFont.truetype(font='./apps/image/arialbd.ttf', size=20)
        draw.text((10, 550), nombre_diseñador + ' - ' + fecha,(255),font=font)

        im.save(processed_directory + diseño_id + target, optimize=True)

        d.diseno_procesado=processed_directory + diseño_id + target
        d.estado = True
        d.save()

        apps.email.sendMail.sendMail(d.email_disenador,  diseño_id,  d.fecha_publicacion)
    except OSError as error:
        print(error)
        shutil.copy(path + diseño_original,  badFiles_directory + filename)        
