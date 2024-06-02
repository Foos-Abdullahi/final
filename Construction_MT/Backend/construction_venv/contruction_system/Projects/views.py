from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import ProjectsSerializers
from .models import Projects
from django.db.models import Q
from django.utils import timezone
from rest_framework import status

# Create your views here.
@api_view(["GET"])
def get_project_managerBy_id(request):
    project_manager_id = request.query_params.get('pmId', None)
    if project_manager_id:
        project_managers = Projects.objects.filter(project_Manager__id=project_manager_id)
        serialized_projectManagers = ProjectsSerializers(project_managers, many=True)
        return Response(serialized_projectManagers.data)
    else:
        return Response({"error": "Proejct Manager not provided"}, status=400)

@api_view(['GET'])
def search_dates_between(request):
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')

    if not start_date or not end_date:
        return Response("Both start_date and end_date parameters are required.")

    try:
        start_date = timezone.datetime.strptime(start_date, '%Y-%m-%d').date()
        end_date = timezone.datetime.strptime(end_date, '%Y-%m-%d').date()
    except ValueError:
        return Response("Invalid date format. Please use YYYY-MM-DD format.")

    projects = Projects.objects.filter(issue_date__range=[start_date, end_date])
    serializer = ProjectsSerializers(projects, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_project_managerBy_id(request):
    project_manager_id = request.query_params.get('pmId', None)
    if project_manager_id:
        project_managers = Projects.objects.filter(project_Manager__id=project_manager_id)
        serialized_projectManagers = ProjectsSerializers(project_managers, many=True)
        return Response(serialized_projectManagers.data)
    else:
        return Response({"error": "Proejct Manager not provided"}, status=400)
    
@api_view(['GET'])
def searchProjectNo(request):
    query_param = request.GET.get('prNo', '')
    project = Projects.objects.filter(
        Q(project_No__icontains=query_param)
    )
    serializer = ProjectsSerializers(project, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def search_by_client_id(request):
    client_id = request.GET.get('client_id', '')
    if client_id:
        projects = Projects.objects.filter(client__id=client_id)
        serializer = ProjectsSerializers(projects, many=True)
        return Response(serializer.data)
    return Response({"error": "Client ID not provided"}, status=400)

@api_view(['GET'])
def search(request):
    query_param = request.GET.get('query', '')
    project = Projects.objects.filter(
        Q(issue_date__icontains=query_param)
    )
    serializer = ProjectsSerializers(project, many=True)
    return Response(serializer.data)


#get all
@api_view(['GET'])
def getAll(request):
    project=Projects.objects.all()
    serializers=ProjectsSerializers(project,many=True)
    return Response(serializers.data)

# get by id 
@api_view(['GET'])
def getById(request, id):
    project=Projects.objects.get(id=id)
    serializers=ProjectsSerializers(project,many=False)
    return Response(serializers.data)

# delete
@api_view(['DELETE'])
def delete(request, id):
    project=Projects.objects.get(id=id)
    project.delete()
    return Response("Project is deleted")

#create
@api_view(['POST'])
def create(request):
    user_id = request.data.get('user_id')
    if not user_id:
        return Response({"detail": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = ProjectsSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save(user_id=user_id)
        return Response({"detail": "Project created successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




#update
@api_view(['PUT'])
def update(request, id):
    project=Projects.objects.get(id=id)
    serializer = ProjectsSerializers(instance=project, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response('Project updated')



