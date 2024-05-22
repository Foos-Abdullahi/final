from django.db import models
import datetime
# Create your models here.

class Role(models.Model):
    Role_name = models.CharField(max_length=100)
    issue_date = models.DateField(default=datetime.date.today)
