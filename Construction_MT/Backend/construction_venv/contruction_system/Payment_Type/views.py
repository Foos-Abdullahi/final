from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import PaymentTypeSerializer
from .models import Payment_Type
from django.db.models import Q
from rest_framework import status

@api_view(['GET'])
def search(request):
    query_param = request.GET.get('query', '')
    pyType = Payment_Type.objects.filter(
        Q(issue_date__icontains=query_param)
    )
    serializer = PaymentTypeSerializer(pyType, many=True)
    return Response(serializer.data)


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
    user_id = request.data.get('user_id')
    if not user_id:
        return Response({"detail": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    serializers = PaymentTypeSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save(user_id = user_id)
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