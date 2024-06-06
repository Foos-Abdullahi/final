from django.db import models
import datetime
# from .models import user
# Create your models here.
class Companies(models.Model):
    company_name = models.CharField(max_length=100)
    company_logo = models.ImageField(max_length=100)
    company_address = models.CharField(max_length=100)
    company_phone = models.CharField(max_length=100, default=None)
    company_about = models.CharField(max_length=100 , default=None)
    email = models.EmailField(unique=True, default=None) 
    # user = models.ForeignKey(user,on_delete=models.CASCADE, default=None)  
    issue_date = models.DateField(default=datetime.date.today)


