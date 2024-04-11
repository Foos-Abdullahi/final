from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import PaymentTypeSerializer
from .models import Payment_Type

# Create your views here.

@api_view(['GET'])
def getAll(request):
    payment_Type = Payment_Type.objects.all()
    serializers = PaymentTypeSerializer(payment_Type,many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getById(request,id):
    payment_Type = Payment_Type.objects.get(id=id)
    serializers = PaymentTypeSerializer(payment_Type,many=False)
    return Response(serializers.data)


@api_view(['POST'])
def create(request):
    serializers = PaymentTypeSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
    return Response("Payment_Type is saved")


@api_view(['PUT'])
def update(request, id):
    payment_Type=Payment_Type.objects.get(id=id)
    serializers = PaymentTypeSerializer(instance=payment_Type, data=request.data)
    if serializers.is_valid():
        serializers.save()
    return Response('Payment_Type is updated')

@api_view(['DELETE'])
def delete(request, id):
    payment_Type=Payment_Type.objects.get(id=id)
    payment_Type.delete()
    return Response("Payment_Type is deleted")