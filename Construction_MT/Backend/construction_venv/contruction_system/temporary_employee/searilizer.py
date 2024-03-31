from rest_framework import serializers
from .models import Temporary_Employee

class Temporary_EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Temporary_Employee
        fields = '__all__'
