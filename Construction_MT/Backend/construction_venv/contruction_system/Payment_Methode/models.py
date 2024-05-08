from django.db import models
import datetime
# Create your models here.

class Payment_Methode(models.Model):
    pay_method_image = models.ImageField(max_length=100,default='none')
    Py_method_name = models.CharField(max_length=100)
    issue_date = models.DateField(default=datetime.date.today)