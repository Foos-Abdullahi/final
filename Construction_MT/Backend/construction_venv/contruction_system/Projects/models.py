from django.db import models
import datetime
from Client.models import Client
from Budget.models import Budget

# Create your models here.

class Projects(models.Model):
    project_name = models.CharField(max_length=100)
    client = models.ForeignKey(Client, on_delete=models.CASCADE,default=None)
    status = models.CharField(max_length=100)
    Nootaayo = models.CharField(max_length=100,default="Unknown")
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE,default=None)
    start_date = models.DateField()
    end_date = models.DateField()
    issue_date = models.DateField(default=datetime.date.today)
    

