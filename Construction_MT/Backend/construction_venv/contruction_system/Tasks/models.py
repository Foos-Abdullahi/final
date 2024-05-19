from django.db import  models
from Projects.models import Projects
from user.models import User
# Create your models here.
class Tasks(models.Model):
   project=models.ForeignKey(Projects,on_delete=models.CASCADE,default=None)
   task_name=models.CharField(max_length=100)
   # task_image = models.ImageField(max_length=100,default=None)
   task_image = models.ImageField(upload_to='', null=True, blank=True)
   task_image = models.ImageField(max_length=100)
   start_date=models.DateField()
   end_date=models.DateField()
   status=models.CharField(max_length=100)
   user = models.ForeignKey(User,on_delete=models.CASCADE, default=None)
   issue_date=models.DateField()
   
