from django.db import models
import datetime
# Create your models here.

class Client(models.Model):
    client_name = models.CharField(max_length=100)
    client_image = models.ImageField(max_length=100)
    password = models.CharField(max_length=100,)
    email = models.EmailField(unique=True, default=None)  # Add email field with unique constraint 
    phone = models.CharField(max_length=100 , unique=True, default=None)
    document_image = models.ImageField(max_length=100)
    issue_date = models.DateField(default=datetime.date.today)


