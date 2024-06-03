from rest_framework.decorators import api_view
from rest_framework.response import Response
from .searilizer import ServiceSerializers
from .models import Service
from rest_framework import status


# Create your views here.
#get all
@api_view(['GET'])
def getAll(request):
    service=Service.objects.all()
    serializers=ServiceSerializers(service,many=True)
    return Response(serializers.data)
    
# get by id 
@api_view(['GET'])
def getById(request, id):
    service=Service.objects.get(id=id)
    serializers=ServiceSerializers(service,many=False)
    return Response(serializers.data)
    
#create
@api_view(['POST'])
def create(request):
    # user_id = request.data.get('user')
    # if not user_id:
    #     return Response({"detail": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    serializer = ServiceSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save() 
    return Response("service is saved")

#update
@api_view(['PUT'])
def update(request, id):
    service=Service.objects.get(id=id)
    serializer = ServiceSerializers(instance=service, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response('service is updated')