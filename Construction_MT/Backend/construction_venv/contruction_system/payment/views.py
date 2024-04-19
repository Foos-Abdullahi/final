from rest_framework.decorators import api_view
from rest_framework.response import Response
from .searilizer import ExpenseSearilizer
from .models import Expense

# Create your views here.

@api_view(['GET'])
def getAll(request):
    expenses = Expense.objects.all()
    searilizer = ExpenseSearilizer(expenses,many=True)
    return Response(searilizer.data)

@api_view(['GET'])
def getById(request,id):
    expense = Expense.objects.get(id=id)
    searilizer = ExpenseSearilizer(expense,many=False)
    return Response(searilizer.data)

@api_view(['POST'])
def create(request):
    searilizer = ExpenseSearilizer(data=request.data)
    if searilizer.is_valid():
        searilizer.save()
    return Response("Saved")

@api_view(['PUT'])
def update(request, id):
    expense = Expense.objects.get(id=id)
    searilizer = ExpenseSearilizer(expense, data=request.data)
    if searilizer.is_valid():
        searilizer.save()
    return Response("Updated")

@api_view(['DELETE'])
def delete(request,id):
    expense = Expense.objects.get(id=id)
    expense.delete()
    return Response("Deleted")
