# Backend Proyecto #1
Para desplegar correctamente este backend siga las siguientes instrucciones

## Prerrequisitos
Tener instalado Anaconda en su SO. Si no lo tiene instalado aún puede consultar
las instrucciones en <https://www.anaconda.com/products/individual>

## Instrucciones
Ya con Anaconda instalado en su sistema y estando en el directorio en el cual descargo
este repositorio:

1. Descargue las dependencias necesarias para ejecutar este proyecto mediante:
    ```
    conda env create --name proyecto1 -f environment.yml
    ```
2. Active el ambiente de ejecución
    ```
    conda activate proyecto1
    ```
3. Cree los modelos y migrelos a la base de datos
    ```
    python manage.py makemigrations
    python manage.py migrate
    ```
4. Despliegue el servidor web - por defecto utilizaremos el puerto 8080 en localhost
    ```
    python manage.py runserver 0.0.0.0:8080
    ```
Si desea probar los servicios que expone esta API le recomendamos leer la documentación disponible en
<https://documenter.getpostman.com/view/5159131/TVCb3VqL>. Asimismo, en la carpeta test se encuentran tambien
las colecciones




