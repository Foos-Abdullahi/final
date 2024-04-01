from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import DesignSerializer
from .models import Design

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
    serializers = DesignSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
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