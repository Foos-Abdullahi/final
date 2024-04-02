from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import ConfigInvoiceSerializers
from .models import ConfigInvoice

# Create your views here.
#get all
@api_view(['GET'])
def getAll(request):
    configInvoice=ConfigInvoice.objects.all()
    serializers=ConfigInvoiceSerializers(configInvoice,many=True)
    return Response(serializers.data)

# get by id 
@api_view(['GET'])
def getById(request, id):
    configInvoice=ConfigInvoice.objects.get(id=id)
    serializers=ConfigInvoiceSerializers(configInvoice,many=False)
    return Response(serializers.data)

# delete
@api_view(['DELETE'])
def delete(request, id):
    configInvoice=ConfigInvoice.objects.get(id=id)
    configInvoice.delete()
    return Response("ConfigInvoice is deleted")

#create
@api_view(['POST'])
def create(request):
    serializer = ConfigInvoiceSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response("ConfigInvoice is saved")

#update
@api_view(['PUT'])
def update(request, id):
    configInvoice=ConfigInvoice.objects.get(id=id)
    serializer = ConfigInvoiceSerializers(instance=configInvoice, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response('ConfigInvoice is updated')

