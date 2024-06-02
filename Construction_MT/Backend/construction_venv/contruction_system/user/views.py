from rest_framework.decorators import api_view
from rest_framework.response import Response
from .searilizer import UserSearilizer
from .models import User
from django.db.models import Q

@api_view(['GET'])
def search(request):
    query_param = request.GET.get('query', '')
    user = User.objects.filter(
        Q(issue_date__icontains=query_param)
    )
    serializer = UserSearilizer(user, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_usersBy_role_name(request):
    role_name = request.query_params.get('role', None)
    if role_name:
        users = User.objects.filter(role_id__Role_name=role_name)
        serialized_users = UserSearilizer(users, many=True)
        return Response(serialized_users.data)
    else:
        return Response({"error": "Role Name not provided"}, status=400)

@api_view(['GET'])
def getAll(request):
    users = User.objects.all()
    searilizer = UserSearilizer(users,many=True)
    return Response(searilizer.data)

@api_view(['GET'])
def getById(request,id):
    user = User.objects.get(id=id)
    searilizer = UserSearilizer(user,many=False)
    return Response(searilizer.data)

@api_view(['POST'])
def create(request):
    searilizer = UserSearilizer(data=request.data)
    if searilizer.is_valid():
        searilizer.save()
    return Response("Saved")

@api_view(['PUT'])
def update(request, id):
    user = User.objects.get(id=id)
    searilizer = UserSearilizer(user, data=request.data)
    if searilizer.is_valid():
        searilizer.save()
    return Response("Updated")

@api_view(['DELETE'])
def delete(request,id):
    user = User.objects.get(id=id)
    user.delete()
    return Response("Deleted")
