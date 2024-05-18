from django.db import models
import datetime
# from .models import user
# Create your models here.
class Companies(models.Model):
    company_name = models.CharField(max_length=100)
    company_logo = models.ImageField(max_length=100)
    company_address = models.CharField(max_length=100)
    email = models.EmailField(unique=True, default=None) 
    # user = models.ForeignKey(user,on_delete=models.CASCADE, default=None)  
    issue_date = models.DateField(default=datetime.date.today)


