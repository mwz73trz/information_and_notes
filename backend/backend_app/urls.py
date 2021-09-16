from django.urls import path, include
from rest_framework.routers import DefaultRouter
from backend_app.views import SubjectViewSet, TitleViewSet

router = DefaultRouter()
router.register("subjects", SubjectViewSet, basename="subject")
router.register("titles", TitleViewSet, basename="title")

urlpatterns = [
    path("", include(router.urls))
]
