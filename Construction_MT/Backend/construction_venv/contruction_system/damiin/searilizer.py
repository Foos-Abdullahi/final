from rest_framework import serializers
from .models import Damiin

class DamiinSerializers(serializers.ModelSerializer):
    class Meta:
        model=Damiin
        fields='__all__'