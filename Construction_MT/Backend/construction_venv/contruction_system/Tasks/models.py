from django.db import  models
from Projects.models import Projects
# Create your models here.
class Tasks(models.Model):
   project=models.ForeignKey(Projects,on_delete=models.CASCADE,default=None)
   task_name=models.CharField(max_length=100)
   task_image = models.ImageField(max_length=100,default='finish')
   start_date=models.DateField()
   end_date=models.DateField()
   status=models.CharField(max_length=100)
   issue_date=models.DateField()
   
