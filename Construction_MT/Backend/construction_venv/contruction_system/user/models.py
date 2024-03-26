from django.db import models
from Employee.models import Employee


# Create your models here.
class User(models.Model):
    UserName = models.CharField(max_length=100)
    Password = models.CharField(max_length=100)
    # role_id = models.ForeignKey(role,on_delete=models.CASCADE)
    employee_id = models.ForeignKey(Employee,on_delete=models.CASCADE)

