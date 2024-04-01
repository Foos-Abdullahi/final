from rest_framework.decorators import api_view
from rest_framework.response import  Response
from .searilizer import TemporarySalarySerializer
from .models import TemporarySalary
# Create your views here.

#get All
@api_view(['GET'])
def getAll(request):
    temp_salary=TemporarySalary.objects.all()
    serializer = TemporarySalarySerializer(temp_salary,many=True)
    return Response(serializer.data)

#get by id
@api_view(['GET'])
def  GetById(request,id):
    temp_salary=TemporarySalary.objects.get(id=id)
    serializer=TemporarySalarySerializer(temp_salary,many=False)
    return Response(serializer.data)

#delete
@api_view(['DELETE'])
def  delete(request,id):
    #tasks=Tasks.objects.filter(id=id).delete()
    temp_salary=TemporarySalary.objects.get(id=id)
    temp_salary.delete()
    return Response("Temporay Salary has been deleted")

#add new
@api_view(['POST'])
def Addnew(request):
    Serializer=TemporarySalarySerializer(data=request.data)
    if Serializer.is_valid():
        Serializer.save()
    return  Response("New Temporay Salary is added")

#Update
@api_view(['PUT'])
def Update(request,id):
    temp_salary=TemporarySalary.objects.get(id=id)
    Serializer=TemporarySalarySerializer(instance=temp_salary,data=request.data)
    if Serializer.is_valid():
        Serializer.save()
    return  Response('The Temporay Salary was updated')