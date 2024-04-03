from django.db import  models
from Projects.models import Projects
from temporary_employee.models import Temporary_Employee
# Create your models here.
class TemporarySalary(models.Model):
   Temporary_employee_id=models.ForeignKey(Temporary_Employee,on_delete=models.CASCADE,default=None)
   rate=models.CharField(max_length=100)
   hour=models.DecimalField(max_digits=5, decimal_places=2)
   subtotal=models.DecimalField(max_digits=5, decimal_places=2)
   issue_date=models.DateTimeField()
   
