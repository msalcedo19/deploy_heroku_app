from django.db import models
from backend.settings import UPLOAD_ROOT
from django.core.files.storage import FileSystemStorage
from apps.proyecto.models import Proyecto
import uuid

# Indica la ruta de almacenamiento
upload_storage = FileSystemStorage(location=UPLOAD_ROOT)

# Determina el nombre del diseño y la ruta para almacenarlo
def save_process_design(instance, filename):
    fn = str(instance.id) + '.' + filename.split('.')[-1]
    return 'proceso/{0}'.format(fn)

# Create your models here.
class Diseño(models.Model):
    proyecto = models.ForeignKey(Proyecto, related_name='diseños', on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre_disenador = models.CharField(max_length=256)
    apellido_disenador = models.CharField(max_length=256)
    email_disenador = models.EmailField(max_length=256)
    fecha_publicacion = models.DateTimeField(auto_now=True)
    estado = models.BooleanField(null=False, default=False)
    precio = models.IntegerField(null=False)
    # Cargar los modelos en el sistema
    diseno_original = models.ImageField(null=False, upload_to=save_process_design, storage=upload_storage)
    diseno_procesado = models.ImageField(null=True)
