from rest_framework.decorators import api_view
from rest_framework.response import Response
from .searializer import CompaniesSerializers
from .models import Companies
from rest_framework.parsers import FileUploadParser
from django.db.models import Q
from django.db import connection

# Create your views here.
#get all
@api_view(['GET'])
def getAll(request):
    company=Companies.objects.all()
    serializers=CompaniesSerializers(company,many=True)
    return Response(serializers.data)
    
# get by id 
@api_view(['GET'])
def getById(request, id):
    company=Companies.objects.get(id=id)
    serializers=CompaniesSerializers(company,many=False)
    return Response(serializers.data)
    
#create
@api_view(['POST'])
def create(request):
    serializer = CompaniesSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()      
    return Response("Company is saved")

#update
@api_view(['PUT'])
def update(request, id):
    company=Companies.objects.get(id=id)
    serializer = CompaniesSerializers(instance=company, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response('Company is updated')