from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import RoleSerializer
from .models import Role
from django.db.models import Q
from django.db import connection

@api_view(['GET'])
def search(request):
    query_param = request.GET.get('query', '')
    role = Role.objects.filter(
        Q(issue_date__icontains=query_param)
    )
    serializer = RoleSerializer(role, many=True)
    return Response(serializer.data)

# Create your views here.

@api_view(['GET'])
def getAll(request):
    roles = Role.objects.all()
    serializers = RoleSerializer(roles,many=True)
    return Response(serializers.data)
    #  with connection.cursor() as cursor:
    #     cursor.callproc('get_roles')
    #     roles = cursor.fetchall()
    #     roles_data = [{'id': role[0], 'Role_name': role[1], 'issue_date': role[2]} for role in roles]
    
    #  return Response(roles_data)




@api_view(['GET'])
def getById(request,id):
    with connection.cursor() as cursor:
        cursor.callproc('get_roles_by_id', [id])
        role = cursor.fetchone()
    return Response(role)



@api_view(['POST'])
def create(request):
    allroles = Role.objects.all()
    role_name = request.data.get('Role_name','')
    # issue_date = request.data.get('issue_date', '')
    print("Role Name" + role_name)
    # print("Date" + issue_date)
    with connection.cursor() as cursor:
        # cursor.execute('INSERT INTO role_role (Role_name) VALUES (`role_name`)')
        cursor.execute('INSERT INTO role_role (Role_name) VALUES (%s)', [role_name])
        # cursor.callproc('create',[role_name])
        # cursor.execute()
    
    return Response("Role is saved")


@api_view(['PUT'])
def update(request, id):
    # role=Role.objects.get(id=id)
    # serializers = RoleSerializer(instance=role, data=request.data)
    # if serializers.is_valid():
    #     serializers.save()
    new_role_name = request.data.get('Role_name', '')  # Extract new role_name from request data

    with connection.cursor() as cursor:
        cursor.execute('UPDATE role_role SET Role_name = %s WHERE id = %s', [new_role_name, id])
    return Response('Role is updated')

@api_view(['DELETE'])
def delete(request, id):
    role=Role.objects.get(id=id)
    role.delete()
    return Response("Role is deleted")