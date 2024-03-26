from django.db import models

# Create your models here.
class Damiin(models.Model):
    Name = models.CharField(max_length=200)
    Document = models.CharField(max_length = 100000)