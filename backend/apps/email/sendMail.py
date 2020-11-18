import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def sendMail(to,  nombreDiseno,  fechaDiseno):
    msg = MIMEMultipart()
    msg['From'] = 'DesignMatch@gmail.com'
    msg['To'] = to
    msg['Subject'] = 'Confirmacion publicacion diseno'
    message = 'Se confirma que el diseno ' + nombreDiseno + ' cargado el ' +  fechaDiseno.strftime("%H:%M:%S") +' ya ha sido publicado en la pagina.'

    msg.attach(MIMEText(message,'plain'))

    # Reemplaza estos valores con tus credenciales de Google Mail
    username = 'XXXXXXXX'
    password = 'XXXXXXXXXXXXXXXXXXXXXX/XXXXXXXXXXXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXX'

    server = smtplib.SMTP('ses-smtp-user.20201001-145600')
    server.starttls()
    server.login(username, password)
    server.sendmail(username, msg['To'], msg.as_string())

    server.quit()
