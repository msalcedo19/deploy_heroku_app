#!/bin/bash

# Activar Anaconda
source /home/ubuntu/anaconda/bin/activate
conda activate cloud

# Correr GUnicorn
gunicorn --error-logfile=/home/ubuntu/error.log --workers=3 --bind=0.0.0.0:8080 backend.wsgi:application
