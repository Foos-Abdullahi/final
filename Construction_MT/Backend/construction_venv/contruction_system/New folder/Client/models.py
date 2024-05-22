from django.db import models
import datetime
from user.models import User
# Create your models here.

class Client(models.Model):
    client_name = models.CharField(max_length=100)
    client_image = models.ImageField(max_length=100)
    password = models.CharField(max_length=100,)
    email = models.EmailField(unique=True, default=None)  
    phone = models.CharField(max_length=100 , unique=True, default=None)
    document_image = models.ImageField(max_length=100)
    user = models.ForeignKey(User,on_delete=models.CASCADE, default=None)
    issue_date = models.DateField(default=datetime.date.today)



