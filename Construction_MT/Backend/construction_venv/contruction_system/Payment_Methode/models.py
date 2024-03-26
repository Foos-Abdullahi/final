from django.db import models

# Create your models here.

class Payment_Methode(models.Model):
    Py_method_name = models.CharField(max_length=100)