from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import EmployeeSerializers
from .models import Employee

# Create your views here.
#get all
@api_view(['GET'])
def getAll(request):
    employee=Employee.objects.all()
    serializers=EmployeeSerializers(employee,many=True)
    return Response(serializers.data)

# get by id 
@api_view(['GET'])
def getById(request, id):
    employee=Employee.objects.get(id=id)
    serializers=EmployeeSerializers(employee,many=False)
    return Response(serializers.data)

# delete
@api_view(['DELETE'])
def delete(request, id):
    employee=Employee.objects.get(id=id)
    employee.delete()
    return Response("Employee is deleted")

#create
@api_view(['POST'])
def create(request):
    serializer = EmployeeSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response("Employee is saved")

#update
@api_view(['PUT'])
def update(request, id):
    employee=Employee.objects.get(id=id)
    serializer = EmployeeSerializers(instance=employee, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response('Employee is updated')

