from django.db import models
import datetime
# Create your models here.

class Client(models.Model):
    client_name = models.CharField(max_length=100)
    client_image = models.ImageField(max_length=100)
    password = models.CharField(max_length=100,)
    phone = models.CharField(max_length=100)
    document_image = models.ImageField(max_length=100)
    issue_date = models.DateField(default=datetime.date.today)


