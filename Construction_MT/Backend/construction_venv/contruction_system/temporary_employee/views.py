from rest_framework.decorators import api_view
from rest_framework.response import  Response
from .searilizer import Temporary_EmployeeSerializer
from .models import Temporary_Employee
# Create your views here.

#get All
@api_view(['GET'])
def getAll(request):
    temp_emp=Temporary_Employee.objects.all()
    serializer = Temporary_EmployeeSerializer(temp_emp,many=True)
    return Response(serializer.data)

#get by id
@api_view(['GET'])
def  GetById(request,id):
    temp_emp=Temporary_Employee.objects.get(id=id)
    serializer=Temporary_EmployeeSerializer(temp_emp,many=False)
    return Response(serializer.data)

#delete
@api_view(['DELETE'])
def  delete(request,id):
    #tasks=Tasks.objects.filter(id=id).delete()
    temp_emp=Temporary_Employee.objects.get(id=id)
    temp_emp.delete()
    return Response("Temporay Employee has been deleted")

#add new
@api_view(['POST'])
def Addnew(request):
    Serializer=Temporary_EmployeeSerializer(data=request.data)
    if Serializer.is_valid():
        Serializer.save()
    return  Response("New Temporay Employee is added")

#Update
@api_view(['PUT'])
def Update(request,id):
    temp_emp=Temporary_Employee.objects.get(id=id)
    Serializer=Temporary_EmployeeSerializer(instance=temp_emp,data=request.data)
    if Serializer.is_valid():
        Serializer.save()
    return  Response('The Temporay Employee was updated')