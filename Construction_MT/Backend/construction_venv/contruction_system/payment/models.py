from django.db import models
from Payment_Type.models import Payment_Type
from user.models import User

# Create your models here.
class Expense(models.Model):
    payment_Type = models.ForeignKey(Payment_Type,on_delete=models.CASCADE)
    expense_description = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits= 10, decimal_places=2)  
    user = models.ForeignKey(User,on_delete=models.CASCADE, default=None)
    expense_date = models.DateField(auto_now_add=True)