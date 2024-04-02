from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import BudgetSerializer
from .models import Budget
# Create your views here.
#get all
@api_view(["GET"])
def get_all(requst):
    budget=Budget.objects.all()
    serializer= BudgetSerializer(budget,many=True)
    return Response(serializer.data)
#get by id
@api_view(["GET"])
def get_by_id(request,id):
    budget= Budget.objects.get(id=id)
    serializer=BudgetSerializer(budget,many=False)
    return Response(serializer.data)

# delete 
@api_view(["DELETE"])
def delete_item(request,id):
    budget = Budget.objects.filter(id=id).delete()
    return Response("Item is deleted")

#create 
@api_view(["POST"])
def create_item(request):
    serializer= BudgetSerializer(data=request.data) 
    if serializer.is_valid():
        serializer.save()
    return Response("New Budget is added")  
# update
@api_view(["PUT"])
def update_item(request,id):
    budget=Budget.objects.get(id=id)
    serializer= BudgetSerializer(instance=budget,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response("The item has been updated")
