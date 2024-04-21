from django.db import models
import datetime
# Create your models here.

class Client(models.Model):
    client_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    document = models.CharField(max_length=100,default="Unknown")
    balance = models.DecimalField(max_digits= 10, decimal_places=2,default=0) 
    issue_date = models.DateField(default=datetime.date.today)


