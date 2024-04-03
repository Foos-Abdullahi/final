from django.db import models
from Projects.models import Projects
from Client.models import Client
from Payment_Methode.models import  Payment_Methode
# Create your models here.
class Payments(models.Model):
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    payment_method=models.ForeignKey(Payment_Methode,on_delete=models.CASCADE)
    amount=models.DecimalField(max_digits=10, decimal_places=2)
    issue_date = models.DateField() 
    
