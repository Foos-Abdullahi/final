from django.db import  models
from Client.models import Client
# Create your models here.
class Invoice(models.Model):
   client_id=models.ForeignKey(Client,on_delete=models.CASCADE)
   amount=models.DecimalField(max_digits=5, decimal_places=2) 
   issue_date=models.DateTimeField()
   
