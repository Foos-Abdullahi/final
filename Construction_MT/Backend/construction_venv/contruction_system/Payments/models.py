from django.db import models
from Projects.models import Projects
from Client.models import Client
# Create your models here.
class Payments(models.Model):
    project = models.ForeignKey(Projects, on_delete=models.CASCADE, default=None)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, default=None)
    amount=models.DecimalField(max_digits=10, decimal_places=2)
    issue_date = models.DateField() 
   #payment_method_id
