from django.urls import path
from .import views

urlpatterns = [
 path('', views.getAll),
path('view/<int:id>/', views.getById),
path('delete/<int:id>/', views.delete),
path('create/', views.create),
path('update/<int:id>/', views.update),
path('search/', views.search),
path('searchProjectNo/', views.searchProjectNo),
path('searchDatesBetween/', views.search_dates_between),
path('searchByClientID/', views.search_by_client_id),
path('get_project_managerBy_id/', views.get_project_managerBy_id, name='get_project_managerBy_id'),

]