from django.db import models
import datetime

# Create your models here.

class Projects(models.Model):
    project_name = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    budget = models.IntegerField(default=0)
    start_date = models.DateField()
    end_date = models.DateField()
    issue_date = models.DateField(default=datetime.date.today)
    # client_id

