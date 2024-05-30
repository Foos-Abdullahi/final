from rest_framework.decorators import api_view
from rest_framework.response import Response
from .searializer import ContactSerializers
from .models import Contact

# Create your views here.
#get all
@api_view(['GET'])
def getAll(request):
    contact=Contact.objects.all()
    serializers=ContactSerializers(contact,many=True)
    return Response(serializers.data)
    
# get by id 
@api_view(['GET'])
def getById(request, id):
    contact=Contact.objects.get(id=id)
    serializers=ContactSerializers(contact,many=False)
    return Response(serializers.data)
    
#create
@api_view(['POST'])
def create(request):
    serializer = ContactSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()      
    return Response("contact is saved")

#update
@api_view(['PUT'])
def update(request, id):
    contact=Contact.objects.get(id=id)
    serializer = ContactSerializers(instance=contact, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response('contact is updated')