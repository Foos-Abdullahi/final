from django.db import models

# Create your models here.

class Role(models.Model):
    Role_name = models.CharField(max_length=100)