from django.db import models

# Create your models here.

class ConfigInvoice(models.Model):
    rate = models.IntegerField()
    issue_date = models.DateField()