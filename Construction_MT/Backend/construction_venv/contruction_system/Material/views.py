from rest_framework.decorators import api_view
from rest_framework.response import  Response
from .serializer import MaterialSerializer
from .models import Material

# Create your views here.
#get all
@api_view(['GET'])
def get_all(request):
    materials = Material.objects.all()
    serializer=MaterialSerializer(materials,many=True)
    return Response(serializer.data)

#get by id
@api_view(['GET'])
def get_by_id(request,id):
    material=Material.objects.get(id=id)
    serializer=MaterialSerializer(material,many=False)
    return Response(serializer.data)
#delete
@api_view(['DELETE'])
def delete_item(requset,id):
    material=Material.objects.get(id=id)
    material.delete()
    return Response("Item is deleted")
#create
@api_view(['POST'])
def  create_item(request):
    serializer=MaterialSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response("New material is added")
#update
@api_view(['PUT'])
def update_item(request,id):
    material=Material.objects.get(id=id)
    serializer=MaterialSerializer(instance=material,data=request.data)
    if serializer.is_valid():
        serializer.save()
    return  Response("The item has been updated")