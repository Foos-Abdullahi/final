from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import ClientSerializers
from .models import Client
from rest_framework.parsers import FileUploadParser
from django.db.models import Q
import re
from rest_framework import status

# Create your views here.
@api_view(['GET'])
def search(request):
    query_param = request.GET.get('query', '')
    clients = Client.objects.filter(
        Q(phone__icontains=query_param) 
    )
    serializer = ClientSerializers(clients, many=True)
    return Response(serializer.data)
#get all
@api_view(['GET'])
def getAll(request):
    client=Client.objects.all()
    serializers=ClientSerializers(client,many=True)
    return Response(serializers.data)
# get by id 
@api_view(['GET'])
def getById(request, id):
    client=Client.objects.get(id=id)
    serializers=ClientSerializers(client,many=False)
    return Response(serializers.data)
# delete
@api_view(['DELETE'])
def delete(request, id):
    client=Client.objects.get(id=id)
    client.delete()
    return Response("Client is deleted")

@api_view(['POST'])
def create(request):
    user_id = request.data.get('user')
    if not user_id:
        return Response({"detail": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    phone_number = request.data.get('phone')
    if Client.objects.filter(phone=phone_number).exists():
        return Response("this Client already exists", status=status.HTTP_400_BAD_REQUEST)
    
    serializer = ClientSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save(user_id=user_id)
        return Response("Client is saved", status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#update
@api_view(['PUT'])
def update(request, id):
    try:
        client = Client.objects.get(id=id)
    except Client.DoesNotExist:
        return Response({"error": "Client not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ClientSerializers(instance=client, data=request.data)
    if serializer.is_valid():
        serializer.save()
        print(f"waa lawadaa :{serializer}")
        return Response(serializer.data, status=status.HTTP_200_OK)    
    return Response('Project is updated')





