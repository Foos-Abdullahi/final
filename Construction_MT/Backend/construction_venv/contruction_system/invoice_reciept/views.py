from rest_framework.decorators import api_view
from rest_framework.response import  Response
from .serializers import PaymentSerializer
from  .models import Payments

# Create your views here.
#getAll
@api_view(["GET"])
def getAll(request):
    payments = Payments.objects.all()
    serializer= PaymentSerializer(payments , many=True)
    return Response(serializer.data)
#get by id
@api_view(["GET"])
def getById(request,id):
   payment= Payments.objects.get(id=id)
   serializer=PaymentSerializer(payment,many=False)
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
    serializer = PaymentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response("payment is saved")
    
#update
@api_view(['PUT'])
def update(request,id):
     payment=Payments.objects.get(id=id)
     serializer=PaymentSerializer(instance=payment, data=request.data)
     if serializer.is_valid():
          serializer.save()
     return  Response("The Reciept has been updated")
    
   