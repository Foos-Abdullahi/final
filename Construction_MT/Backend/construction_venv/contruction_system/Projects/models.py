from django.db import models
import datetime
from Client.models import Client
from Design.models import Design
from user.models import User
# Create your models here.

class Projects(models.Model):
    project_No = models.CharField(max_length=100,)
    project_name = models.CharField(max_length=100)
    client = models.ForeignKey(Client, on_delete=models.CASCADE ,default=None)
    design = models.ForeignKey(Design, on_delete=models.CASCADE, default=None)
    status = models.CharField(max_length=100)
    Agreements = models.CharField(max_length=10000)
    budget=models.FloatField(default=0)    
    BudgetRemain=models.FloatField(default=0)    
    start_date = models.DateField()
    end_date = models.DateField()
    user = models.ForeignKey(User,on_delete=models.CASCADE, default=None)
    issue_date = models.DateField(default=datetime.date.today)
    

