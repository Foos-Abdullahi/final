from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import EmployeeSerializers
from .models import Employee
from django.db.models import Q
import re
# search

@api_view(['GET'])
def search(request):
    query_param = request.GET.get('query', '')
    employee = Employee.objects.filter(
        Q(phone__icontains=query_param)
    )
    serializer = EmployeeSerializers(employee, many=True)
    return Response(serializer.data)

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



@api_view(['POST'])
def create(request):
    # Extract phone number from request data
    phone_number = request.data.get('phone', None)
    email = request.data.get('email', None)
    # Check if an employee with the provided phone number already exists
    if Employee.objects.filter(phone=phone_number).exists() and Employee.objects.filter(email=email).exists():
        return Response("this Employee already exists")
    # Proceed with creating the employee if not already exists
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
        if 'employee_Image' in request.FILES:
            serializer.validated_data['employee_Image'] = re.sub(r'_[^_]*\.', '.',
            request.FILES['employee_Image'].name)
        serializer.save()
    return Response('Employee is updated')

