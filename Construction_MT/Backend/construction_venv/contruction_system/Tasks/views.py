from rest_framework.decorators import api_view
from rest_framework.response import  Response
from .serializer import TaskSerializer
from .models import Tasks
from django.db.models import Q
from rest_framework import status

@api_view(['GET'])
def get_finished_tasks_by_project(request, project_id):
    tasks = Tasks.objects.filter(status='finished', project_id=project_id)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

#get All
@api_view(['GET'])
def all_tasks(request):
    tasks=Tasks.objects.all()
    serializer = TaskSerializer(tasks,many=True)
    return Response(serializer.data)

#get by id
@api_view(['GET'])
def  get_task_by_id(request,id):
    tasks=Tasks.objects.get(id=id)
    serializer=TaskSerializer(tasks,many=False)
    return Response(serializer.data)

#delete
@api_view(['DELETE'])
def  delete_task(request,id):
    #tasks=Tasks.objects.filter(id=id).delete()
    tasks=Tasks.objects.get(id=id)
    tasks.delete()
    return Response("Task has been deleted")

#add new
@api_view(['POST'])
def Addnew(request):
    user_id = request.data.get('user')
    print(f"user ID : {user_id}")
    if not user_id:    
        print(f"Not user ID : {user_id}")
        return Response({"detail": "User ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    Serializer=TaskSerializer(data=request.data)
    if Serializer.is_valid():   
        Serializer.save(user_id = user_id)
        print(f"searlizer : {Serializer}")
    return  Response("New task is added")

#Update
@api_view(['PUT'])
def Update_task(request,id):
    tasks=Tasks.objects.get(id=id)
    Serializer=TaskSerializer(instance=tasks,data=request.data)
    if Serializer.is_valid():
        Serializer.save()
    return  Response('The task was updated')