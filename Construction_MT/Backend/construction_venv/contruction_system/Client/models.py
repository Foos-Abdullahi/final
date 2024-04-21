from django.db import models
import datetime
# Create your models here.

class Client(models.Model):
    client_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    document = models.CharField(max_length=100,default="Unknown")
    issue_date = models.DateField(default=datetime.date.today)


