from django.db import models
from Projects.models import  Projects
# Create your models here.
class Material(models.Model):
     project=models.ForeignKey(Projects,on_delete=models.CASCADE,default=None)
     material_name=models.CharField(max_length=100)
     quantity = models.IntegerField()
     unit_price=models.DecimalField(max_digits=5, decimal_places=2) 
     issue_date = models.DateField()