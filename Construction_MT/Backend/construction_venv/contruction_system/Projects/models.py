from django.db import models
import datetime
from Client.models import Client

# Create your models here.

class Projects(models.Model):
    project_name = models.CharField(max_length=100)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    status = models.CharField(max_length=100)
    Nootaayo = models.CharField(max_length=100)
    budget = models.IntegerField(default=0)
    start_date = models.DateField()
    end_date = models.DateField()
    issue_date = models.DateField(default=datetime.date.today)
    

