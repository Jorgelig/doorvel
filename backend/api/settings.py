import os
# import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEBUG = os.environ.get('DEBUG', False)
APP_BASE_URL = os.environ.get('APP_BASE_URL', 'http://localhost:3000')
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-here')


INSTALLED_APPS = [
    'django.contrib.contenttypes',
    'django.contrib.staticfiles',
    'api',
]

MIDDLEWARE = [
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ALLOWED_HOSTS = ['*']
CORS_ALLOWED_ORIGINS = [
    APP_BASE_URL
]
CSRF_TRUSTED_ORIGINS = [
    APP_BASE_URL
]

ROOT_URLCONF = 'api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'api.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.%s' % os.environ.get('DB_TYPE', 'mysql'),
        'NAME': os.environ.get('DB_NAME', 'doorvel'),
        'USER': os.environ.get('DB_USER', 'doorvel_user'),
        'PASSWORD': os.environ.get('DB_PASSWORD', 'doorvel_pass'),
        'HOST': os.environ.get('DB_HOST', 'db'),
        'PORT': os.environ.get('DB_PORT', '3306'),
    }
}

STATIC_URL = '/static/'
