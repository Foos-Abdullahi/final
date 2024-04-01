from rest_framework import serializers
from .models import TemporarySalary

class TemporarySalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = TemporarySalary
        fields = '__all__'
