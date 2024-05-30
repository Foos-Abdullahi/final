from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import ClientSerializers
from .models import Client
from rest_framework.parsers import FileUploadParser
from django.db.models import Q
from django.db import connection
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
    # with connection.cursor() as cursor:
    #     cursor.callproc('get_clients')
    #     clients = cursor.fetchall()
    #     print(clients)
    #     serializer = ClientSerializers(clients, many=True)
    #     return Response(serializer.data)

# get by id 
@api_view(['GET'])
def getById(request, id):
    client=Client.objects.get(id=id)
    serializers=ClientSerializers(client,many=False)
    return Response(serializers.data)
    # with connection.cursor() as cursor:
    #     cursor.callproc('get_client_by_id', [id])
    #     client = cursor.fetchone()
    #     serializer = ClientSerializers(client, many=False)
    #     return Response(serializer.data)

# delete
@api_view(['DELETE'])
def delete(request, id):
    client=Client.objects.get(id=id)
    client.delete()
    return Response("Client is deleted")

#create
# @api_view(['POST'])
# def create(request):
#     serializer = ClientSerializers(data=request.data)
#     if serializer.is_valid():
#         serializer.save()      
#     return Response("Client is saved")
# @api_view(['POST'])
# def create(request):
#     # Extract phone number from request data
#     phone_number = request.data.get('phone', None)
#     # Check if an Client with the provided phone number already exists
#     if Client.objects.filter(phone=phone_number).exists():
#         return Response("this Client already exists")
#     # Proceed with creating the employee if not already exists
#     serializer = ClientSerializers(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response("Client is saved")
@api_view(['POST'])
def create(request):
    user_id = request.data.get('user_id')
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
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



