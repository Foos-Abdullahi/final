from django.shortcuts import render
from rest_framework.decorators import  api_view
from rest_framework.response import Response
from .serializers import PaymentSerializers
from .models  import Payments
# Create your views here.
#getAll
@api_view(["GET"])
def getAll(request):
    payments = Payments.objects.all()
    serializer= PaymentSerializers(payments , many=True)
    return Response(serializer.data)
#get by id
@api_view(["GET"])
def getById(request,id):
   payment= Payments.objects.get(id=id)
   serializer=PaymentSerializers(payment,many=False)
   return  Response(serializer.data)    

 #delete
@api_view(['DELETE'])
def delete(request,id):
        payment=Payments.objects.get(id=id)
        payment.delete()
        return Response('This payment was deleted')
   
#add new
@api_view(['POST'])
def addNew(request):
    serializer = PaymentSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response("payment is saved")
    
#update
@api_view(['PUT'])
def update(request,id):
     payment=Payments.objects.get(id=id)
     serializer=PaymentSerializers(instance=payment, data=request.data)
     if serializer.is_valid():
          serializer.save()
     return  Response(serializer.data)
    
   