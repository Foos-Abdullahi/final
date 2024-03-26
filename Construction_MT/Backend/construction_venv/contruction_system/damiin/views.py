from rest_framework.decorators import api_view
from rest_framework.response import Response
from .searilizer import DamiinSerializers
from .models import Damiin


# Create your views here.
#get all
@api_view(['GET'])
def getAll(request):
    damiins=Damiin.objects.all()
    serializers=DamiinSerializers(damiins,many=True)
    return Response(serializers.data)

# get by id 
@api_view(['GET'])
def getById(request, id):
    damiin=Damiin.objects.get(id=id)
    serializers=DamiinSerializers(damiin,many=False)
    return Response(serializers.data)

# delete
@api_view(['DELETE'])
def delete(request, id):
    damiin=Damiin.objects.get(id=id)
    damiin.delete()
    return Response("Damiin is deleted")

#create
@api_view(['POST'])
def createDamiin(request):
    serializer = DamiinSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response("Damiin is saved")

#update
@api_view(['PUT'])
def update(request, id):
    damiinUpdate=Damiin.objects.get(id=id)
    serializer = DamiinSerializers(instance=damiinUpdate, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response('Damiin is updated')



