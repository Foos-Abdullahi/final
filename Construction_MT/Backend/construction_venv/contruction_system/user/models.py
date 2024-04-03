from django.db import models
from Employee.models import Employee
from Role.models import Role
import datetime


# Create your models here.
class User(models.Model):
    employee_id = models.ForeignKey(Employee,on_delete=models.CASCADE,default=None)
    UserName = models.CharField(max_length=100)
    Password = models.CharField(max_length=100)
    role_id = models.ForeignKey(Role,on_delete=models.CASCADE,default=None)
    issue_date = models.DateField(default=datetime.date.today)
    

