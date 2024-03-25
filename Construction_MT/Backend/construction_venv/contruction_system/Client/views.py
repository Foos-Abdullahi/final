from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import ClientSerializers
from .models import Client


# Create your views here.
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

#create
@api_view(['POST'])
def create(request):
    serializer = ClientSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response("Client is saved")

#update
@api_view(['PUT'])
def update(request, id):
    client=Client.objects.get(id=id)
    serializer = ClientSerializers(instance=client, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response('Project is updated')



