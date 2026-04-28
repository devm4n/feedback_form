from django.db import models


class User(models.Model):
    username = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    email = models.EmailField()
    feedback = models.TextField(max_length=200)
