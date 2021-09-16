from django.contrib import admin
from django.contrib.admin.decorators import register
from backend_app.models import Subject, Title

admin.site.register(Subject)
admin.site.register(Title)
