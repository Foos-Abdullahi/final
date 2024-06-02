from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import DesignSerializer
from .models import Design
from django.db.models import Q
from django.utils.dateparse import parse_date
from rest_framework import status
import re
@api_view(['GET'])
def search(request):
    query_param = request.GET.get('query', '')
    design = Design.objects.filter(
        Q(issue_date__icontains=query_param) 
    )
    serializer = DesignSerializer(design, many=True)
    return Response(serializer.data)
# Create your views here.

@api_view(['GET'])
def getAll(request):
    design = Design.objects.all()
    serializers = DesignSerializer(design,many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getById(request,id):
    design = Design.objects.get(id=id)
    serializers = DesignSerializer(design,many=False)
    return Response(serializers.data)


@api_view(['POST'])
def create(request):
    user_id = request.data.get('user')
    if not user_id:
        return Response({"detail": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    serializers = DesignSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save(user_id=user_id)
        return Response("Design is saved")


@api_view(['PUT'])
def update(request, id):
    design=Design.objects.get(id=id)
    serializers = DesignSerializer(instance=design, data=request.data)
    if serializers.is_valid():
        serializers.save()
    return Response('Design is updated')

@api_view(['DELETE'])
def delete(request, id):
    design=Design.objects.get(id=id)
    design.delete()
    return Response("Design is deleted")