from django.db import models
from Payment_Type.models import Payment_Type

# Create your models here.
class Expense(models.Model):
    payment_Type = models.ForeignKey(Payment_Type,on_delete=models.CASCADE)
    expense_description = models.CharField(max_length=100, default="unkown")
    amount = models.DecimalField(max_digits= 10, decimal_places=2)  
    expense_date = models.DateField(auto_now_add=True)