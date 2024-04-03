from django.db import models

# Create your models here.

class Account(models.Model):
    account_number= models.CharField(max_length=100)
    account_type = models.CharField(max_length=100)
    balance = models.DecimalField(max_digits=20,decimal_places=2)
    issue_date = models.DateField()