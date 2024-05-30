from django.db import models
# from Projects.models import Projects
from Payment_Methode.models import  Payment_Methode
from Client.models import Client
from Projects.models import Projects
import datetime
from user.models import User
# Create your models here.
class Payments(models.Model):
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, default=None)
    client= models.ForeignKey(Client, on_delete=models.CASCADE,default=None)
    payment_method=models.ForeignKey(Payment_Methode,on_delete=models.CASCADE, default=None)
    amount=models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User,on_delete=models.CASCADE, default=None)
    
    issue_date = models.DateField(default=datetime.date.today) 