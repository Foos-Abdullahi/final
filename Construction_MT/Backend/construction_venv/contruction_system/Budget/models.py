from django.db import models
from Config_Invoice.models import ConfigInvoice
# Create your models here.
class Budget(models.Model):
    size=models.CharField(max_length=100)
    quntinty=models.IntegerField()
    Budget=models.DecimalField(max_digits=20, decimal_places=2)
    config_invoice=models.ForeignKey(ConfigInvoice,on_delete=models.CASCADE,default=None)
    issue_date = models.DateField()