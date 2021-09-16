from django.db import models
from django.contrib.auth.models import User

class Subject(models.Model):
    name = models.CharField(max_length=128)
    user = models.ForeignKey(User, related_name="subjects", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} created by {self.user.username}"

class Title(models.Model):
    subject = models.ForeignKey(Subject, related_name="titles", on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    description = models.TextField()
    link = models.CharField(max_length=254, blank=True)

    def __str__(self):
        return f"{self.name}"
