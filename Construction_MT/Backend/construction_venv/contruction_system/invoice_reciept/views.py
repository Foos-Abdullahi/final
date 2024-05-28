from rest_framework.decorators import api_view
from rest_framework.response import  Response
from .serializers import PaymentSerializer
from  .models import Payments
from django.db.models import Q
from rest_framework import status
# Create your views here.

@api_view(['GET'])
def search(request):
    query_param = request.GET.get('query', '')
    payment = Payments.objects.filter(
        Q(issue_date__icontains=query_param)
    )
    serializer = PaymentSerializer(payment, many=True)
    return Response(serializer.data)
@api_view(["GET"])
def get_invoices_by_ProjectNO(request):
    phone_number = request.query_params.get('prNo', None)
    if phone_number:
        invoices = Payments.objects.filter(project__project_No=phone_number)
        serialized_invoices = PaymentSerializer(invoices, many=True)
        return Response(serialized_invoices.data)
    else:
        return Response({"error": "Phone number not provided"}, status=400)

# #getAll
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
def create(request):
    user_id = request.data.get('user')
    if not user_id:
        return Response({"detail": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    serializer = PaymentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user_id=user_id)
    return Response("payment is saved")
    
#update
@api_view(['PUT'])
def update(request,id):
     payment=Payments.objects.get(id=id)
     serializer=PaymentSerializer(instance=payment, data=request.data)
     if serializer.is_valid():
          serializer.save()
     return  Response("The Reciept has been updated")
    
   