from django.db import models
import datetime
from user.models import User
# Create your models here.


class Design(models.Model):
    architecture = models.ImageField(max_length=100)
    status = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits= 10, decimal_places=2)
    user = models.ForeignKey(User,on_delete=models.CASCADE, default=None)
    issue_date = models.DateField(default=datetime.date.today)

    