from rest_framework import serializers
from .models import Design

class DesignSerializer(serializers.ModelSerializer):
    class Meta:
        model=Design
        fields='__all__' 