from django.db import models
import datetime
# Create your models here.
class Contact(models.Model):
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.EmailField(unique=True, default=None) 
    # user = models.ForeignKey(user,on_delete=models.CASCADE, default=None)  
    issue_date = models.DateField(default=datetime.date.today)