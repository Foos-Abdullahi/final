from django.db import models
import datetime

# Create your models here.
class Service(models.Model):
    service_name = models.CharField(max_length=100)
    service_Image = models.CharField(max_length=100)
    # user = models.ForeignKey(user,on_delete=models.CASCADE, default=None)  
    issue_date = models.DateField(default=datetime.date.today)