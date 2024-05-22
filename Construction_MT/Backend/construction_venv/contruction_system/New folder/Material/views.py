from rest_framework.decorators import api_view
from rest_framework.response import  Response
from .serializer import MaterialSerializer
from .models import Material
from django.db.models import Q
from rest_framework import status

# from Projects.models import Projects
# from Tasks.models import Tasks

# @api_view(['GET'])
# def get_projects_by_Name(request):
#     query_param = request.GET.get('query', '')
#     projects = Projects.objects.filter(project_name__icontains=query_param)
#     materials = Material.objects.filter(project__in=projects)
#     tasks = Tasks.objects.filter(project__in=projects)
#     material_serializer = MaterialSerializer(materials, many=True)
#     task_serializer = TasksSerializer(tasks, many=True)
#     return Response({'materials': material_serializer.data, 'tasks': task_serializer.data})
@api_view(["GET"])
def get_projects_by_Name(request):
    projectName = request.query_params.get('prId', None)
    if projectName:
        material = Material.objects.filter(project__id=projectName)
        serialized_Material = MaterialSerializer(material, many=True)
        return Response(serialized_Material.data)
    else:
        return Response({"error": "Project Name not provided"}, status=400)


@api_view(['GET'])
def search(request):
    query_param = request.GET.get('query', '')
    material = Material.objects.filter(
        Q(issue_date__icontains=query_param) 
    )
    serializer = MaterialSerializer(material, many=True)
    return Response(serializer.data)

# Create your views here.
#get all
@api_view(['GET'])
def get_all(request):
    materials = Material.objects.all()
    serializer=MaterialSerializer(materials,many=True)
    return Response(serializer.data)

#get by id
@api_view(['GET'])
def get_by_id(request,id):
    material=Material.objects.get(id=id)
    serializer=MaterialSerializer(material,many=False)
    return Response(serializer.data)
#delete
@api_view(['DELETE'])
def delete_item(requset,id):
    material=Material.objects.get(id=id)
    material.delete()
    return Response("Item is deleted")
#create
@api_view(['POST'])
def  create_item(request):
    serializer=MaterialSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response("New material is added")
#update
@api_view(['PUT'])
def update_item(request,id):
    material=Material.objects.get(id=id)
    serializer=MaterialSerializer(instance=material,data=request.data)
    if serializer.is_valid():
        serializer.save()
    return  Response("The item has been updated")