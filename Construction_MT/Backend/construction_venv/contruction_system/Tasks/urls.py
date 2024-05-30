from django.urls import path
from .import views
urlpatterns = [
    path('',views.all_tasks),
    path('detils/<int:id>/',views.get_task_by_id),
    path('delete/<int:id>/',views.delete_task),
    path('addnew/',views.Addnew),
    path('update/<int:id>/',views.Update_task),
    # path('search/', views.search),
    path('finished_tasks/<int:project_id>/', views.get_finished_tasks_by_project)
    ]