from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import ProjectsSerializers
from .models import Projects


# Create your views here.
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
    serializer = ProjectsSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response("Project saved")

#update
@api_view(['PUT'])
def update(request, id):
    project=Projects.objects.get(id=id)
    serializer = ProjectsSerializers(instance=project, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response('Project updated')



