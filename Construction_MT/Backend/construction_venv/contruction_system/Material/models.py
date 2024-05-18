from django.db import models
from Projects.models import  Projects
import datetime
from user.models import User
# Create your models here.
class Material(models.Model):
     project=models.ForeignKey(Projects,on_delete=models.CASCADE,default=None)
     material_name=models.CharField(max_length=100)
     quantity = models.IntegerField()
     unit_price=models.DecimalField(max_digits=10, decimal_places=2) 
     sub_total=models.DecimalField(max_digits=10, decimal_places=2,default=0) 
     user = models.ForeignKey(User,on_delete=models.CASCADE, default=None)
     issue_date = models.DateField(default=datetime.date.today)

     