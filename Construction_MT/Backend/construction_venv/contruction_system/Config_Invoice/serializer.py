from rest_framework import serializers
from .models import ConfigInvoice

class ConfigInvoiceSerializers(serializers.ModelSerializer):
    class Meta:
        model=ConfigInvoice
        fields='__all__'