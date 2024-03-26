from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import RoleSerializer
from .models import Role

# Create your views here.

@api_view(['GET'])
def getAll(request):
    role = Role.objects.all()
    serializers = RoleSerializer(role,many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getById(request,id):
    role = Role.objects.get(id=id)
    serializers = RoleSerializer(role,many=False)
    return Response(serializers.data)


@api_view(['POST'])
def create(request):
    serializers = RoleSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
    return Response("Role is saved")


@api_view(['PUT'])
def update(request, id):
    role=Role.objects.get(id=id)
    serializers = RoleSerializer(instance=role, data=request.data)
    if serializers.is_valid():
        serializers.save()
    return Response('Role is updated')

@api_view(['DELETE'])
def delete(request, id):
    role=Role.objects.get(id=id)
    role.delete()
    return Response("Role is deleted")