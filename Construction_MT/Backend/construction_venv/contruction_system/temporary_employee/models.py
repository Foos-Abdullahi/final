from django.db import  models
# Create your models here.
class Temporary_Employee(models.Model):
   Temporary_employee_name=models.CharField(max_length=100)
   phone=models.CharField(max_length=100)
   position=models.CharField(max_length=100)
   resgister_date=models.DateTimeField()
   
