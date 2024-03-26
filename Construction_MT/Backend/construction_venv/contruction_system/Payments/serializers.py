from rest_framework import serializers
from .models import Payments

class PaymentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Payments
        fields = '__all__'