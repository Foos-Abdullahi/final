from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import Py_MethodeSerializer
from .models import Payment_Methode
from django.db.models import Q
from rest_framework import status
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
    user_id = request.data.get('user')
    if not user_id:
        return Response({"detail": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    pymentmethod = request.data.get('Py_method_name', None)
    if Payment_Methode.objects.filter(Py_method_name=pymentmethod).exists():
        return Response({"detail": "This payment method already exists."}, status=status.HTTP_400_BAD_REQUEST)

    serializer = Py_MethodeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user_id=user_id)
        return Response({"detail": "Payment method is saved."}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update(request, id):
    try:
        pyment_methode = Payment_Methode.objects.get(id=id)
    except Payment_Methode.DoesNotExist:
        return Response({"detail": "Payment method not found."}, status=status.HTTP_404_NOT_FOUND)

    serializers = Py_MethodeSerializer(instance=pyment_methode, data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response({"detail": "Payment method is updated."}, status=status.HTTP_200_OK)
    else:
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# def create(request):
#     user_id = request.data.get('user')
#     if not user_id:
#         return Response({"detail": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
#     pymentmethod = request.data.get('Py_method_name', None)
#     if Payment_Methode.objects.filter(Py_method_name=pymentmethod).exists():
#         return Response("this Py_method already exists")
#     # Proceed with creating the Py_method_name if not already exists
#     serializer = Py_MethodeSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save(user_id = user_id)
#         return Response("pymentmethod is saved")


# @api_view(['PUT'])
# def update(request, id):
#     pyment_methode=Payment_Methode.objects.get(id=id)
#     serializers = Py_MethodeSerializer(instance=pyment_methode, data=request.data)
#     if serializers.is_valid():
#         serializers.save()
#     return Response('payment_methode is updated')

@api_view(['DELETE'])
def delete(request, id):
    pyment_methode=Payment_Methode.objects.get(id=id)
    pyment_methode.delete()
    return Response("payment_methode is deleted")