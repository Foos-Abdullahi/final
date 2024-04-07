from django.db import models

# Create your models here.

class Employee(models.Model):
    employee_name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    issue_date = models.DateField()