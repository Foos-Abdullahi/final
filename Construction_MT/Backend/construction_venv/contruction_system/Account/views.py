from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import AccountSerializer
from .models import Account

# Create your views here.

@api_view(['GET'])
def getAll(request):
    account = Account.objects.all()
    serializers = AccountSerializer(account,many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getById(request,id):
    account = Account.objects.get(id=id)
    serializers = AccountSerializer(account,many=False)
    return Response(serializers.data)


@api_view(['POST'])
def create(request):
    serializers = AccountSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
    return Response("Account is saved")


@api_view(['PUT'])
def update(request, id):
    account=Account.objects.get(id=id)
    serializers = AccountSerializer(instance=account, data=request.data)
    if serializers.is_valid():
        serializers.save()
    return Response('Account is updated')

@api_view(['DELETE'])
def delete(request, id):
    account=Account.objects.get(id=id)
    account.delete()
    return Response("Account is deleted")