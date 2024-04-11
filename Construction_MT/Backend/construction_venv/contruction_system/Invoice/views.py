from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import InvoiceSerializer
from .models import Invoice

# Create your views here.

@api_view(['GET'])
def getAll(request):
    invoice = Invoice.objects.all()
    serializers = InvoiceSerializer(invoice,many=True)
    return Response(serializers.data)

@api_view(['GET'])
def getById(request,id):
    invoice = Invoice.objects.get(id=id)
    serializers = InvoiceSerializer(invoice,many=False)
    return Response(serializers.data)


@api_view(['POST'])
def create(request):
    serializers = InvoiceSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
    return Response("Invoice is saved")


@api_view(['PUT'])
def update(request, id):
    invoice=Invoice.objects.get(id=id)
    serializers = InvoiceSerializer(instance=invoice, data=request.data)
    if serializers.is_valid():
        serializers.save()
    return Response('Invoice is updated')

@api_view(['DELETE'])
def delete(request, id):
    invoice=Invoice.objects.get(id=id)
    invoice.delete()
    return Response("Invoice is deleted")