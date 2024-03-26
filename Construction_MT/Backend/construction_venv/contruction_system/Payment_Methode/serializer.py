from rest_framework import serializers
from .models import Payment_Methode

class Py_MethodeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Payment_Methode
        fields='__all__' 