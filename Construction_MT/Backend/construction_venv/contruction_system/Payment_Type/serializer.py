from rest_framework import serializers
from .models import Payment_Type

class PaymentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Payment_Type
        fields='__all__' 