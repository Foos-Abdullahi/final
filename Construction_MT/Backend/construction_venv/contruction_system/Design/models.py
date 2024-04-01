from django.db import models

# Create your models here.


class Design(models.Model):
    image = models.CharField(max_length=100)
    status = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits= 10, decimal_places=2)