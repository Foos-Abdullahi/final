from django.db import models

# Create your models here.

class Client(models.Model):
    client_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    issue_date = models.DateField()


