from django.db import models

# Create your models here.
from django.db import models
import datetime
# Create your models here.

class Payment_Type(models.Model):
    Py_Type_name = models.CharField(max_length=100)
    issue_date = models.DateField(default=datetime.date.today)