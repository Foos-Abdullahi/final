from django.db import models
from Projects.models import Projects
from Account.models import Account

# Create your models here.
class Expense(models.Model):
    project = models.ForeignKey(Projects,on_delete=models.CASCADE,default=None)
    expense_description = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits= 10, decimal_places=2)  
    account_type=models.ForeignKey(Account,on_delete=models.CASCADE,default=None)
    expense_date = models.DateField(auto_now_add=True)