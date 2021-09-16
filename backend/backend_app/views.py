from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from backend_app.serializers import SubjectSerializer, TitleSerializer
from backend_app.models import Subject, Title

class SubjectViewSet(ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class TitleViewSet(ModelViewSet):
    queryset = Title.objects.all()
    serializer_class = TitleSerializer
