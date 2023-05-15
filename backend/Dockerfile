# Seleccionamos la imagen base
FROM python:3.9

# Seteamos variables de entorno
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Directorio de trabajo
WORKDIR /app

# Instalamos dependencias de la aplicación
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copiamos los archivos de la aplicación
COPY . .

# Puerto expuesto
EXPOSE 8000

# Comando de arranque
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
