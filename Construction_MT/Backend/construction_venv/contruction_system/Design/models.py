from django.db import models
import datetime
# Create your models here.


class Design(models.Model):
    image = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits= 10, decimal_places=2)
    issue_date = models.DateField(default=datetime.date.today)