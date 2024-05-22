from django.db import models
import datetime
# Create your models here.

class Employee(models.Model):
    employee_name = models.CharField(max_length=100)
    employee_Image = models.ImageField(max_length=100)
    position = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.EmailField(unique=True, default=None) 
    salary = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    issue_date = models.DateField(default=datetime.date.today)