from rest_framework.serializers import ModelSerializer, StringRelatedField
from backend_app.models import Subject, Title

class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name', 'user', 'titles']
        depth = 1

    user = StringRelatedField()

class TitleSerializer(ModelSerializer):
    class Meta:
        model = Title
        fields = '__all__'