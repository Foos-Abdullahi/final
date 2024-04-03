from django.db import  models
from Projects.models import Projects
from Employee.models import Employee
# Create your models here.
class Tasks(models.Model):
   project=models.ForeignKey(Projects,on_delete=models.CASCADE,default=None)
   employee=models.ForeignKey(Employee,on_delete=models.CASCADE,default=None)
   task_name=models.CharField(max_length=100)
   start_date=models.DateField()
   end_date=models.DateField()
   status=models.CharField(max_length=100)
   issue_date=models.DateTimeField()
   
