import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
import sys
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)
os.environ['DJANGO_SETTINGS_MODULE'] =  "backend.settings"
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

import time
import django
django.setup()

from taskManager.tasks import processImages 
from apps.diseño.models import Diseño

while True:
    for d in Diseño.objects.filter(estado=False):
        processImages.delay(d.id, d.diseno_original.name, d.nombre_disenador + ' ' + d.apellido_disenador, d.fecha_publicacion)
    time.sleep(5)