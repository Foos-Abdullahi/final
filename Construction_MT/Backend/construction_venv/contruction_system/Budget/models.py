from django.db import models
# Create your models here.
class Budget(models.Model):
    size=models.CharField(max_length=100)
    quntinty=models.IntegerField()
    Budget=models.DecimalField(max_digits=20, decimal_places=2)
    issue_date = models.DateField(null=True)