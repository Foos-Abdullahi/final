from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import Py_MethodeSerializer
from .models import Payment_Methode
from django.db.models import Q

# Create your views here.
@api_view(['GET'])
def search(request):
    query_param = request.GET.get('query', '')
    py_method = Payment_Methode.objects.filter(
        Q(issue_date__icontains=query_param)
    )
    serializer = Py_MethodeSerializer(py_method, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getAll(request):
    pyment_methode = Payment_Methode.objects.all()
    serializers = Py_MethodeSerializer(pyment_methode,many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getById(request,id):
    pyment_methode = Payment_Methode.objects.get(id=id)
    serializers = Py_MethodeSerializer(pyment_methode,many=False)
    return Response(serializers.data)


@api_view(['POST'])
def create(request):
    serializers = Py_MethodeSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
    return Response("payment_methode is saved")


@api_view(['PUT'])
def update(request, id):
    pyment_methode=Payment_Methode.objects.get(id=id)
    serializers = Py_MethodeSerializer(instance=pyment_methode, data=request.data)
    if serializers.is_valid():
        serializers.save()
    return Response('payment_methode is updated')

@api_view(['DELETE'])
def delete(request, id):
    pyment_methode=Payment_Methode.objects.get(id=id)
    pyment_methode.delete()
    return Response("payment_methode is deleted")