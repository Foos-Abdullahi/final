from rest_framework.decorators import api_view
from rest_framework.response import Response
from .searilizer import ExpenseSearilizer
from .models import Expense
from django.db.models import Q

@api_view(['GET'])
def search(request):
    query_param = request.GET.get('query', '')
    expense = Expense.objects.filter(
        Q(expense_date__icontains=query_param)
    )
    serializer = ExpenseSearilizer(expense, many=True)
    return Response(serializer.data)

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
