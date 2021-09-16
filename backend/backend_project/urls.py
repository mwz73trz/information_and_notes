from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', include('login.urls')),
    path('api/', include('backend_app.urls')),
]
