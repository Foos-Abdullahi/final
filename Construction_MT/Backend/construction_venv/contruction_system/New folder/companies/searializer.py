from rest_framework import serializers
from .models import Companies

class CompaniesSerializers(serializers.ModelSerializer):
    class Meta:
        model=Companies
        fields='__all__'