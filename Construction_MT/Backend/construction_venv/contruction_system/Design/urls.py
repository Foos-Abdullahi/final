from django.urls import path
from .import views

urlpatterns = [
path('', views.getAll),
path('view/<int:id>/', views.getById),
path('create/', views.create),
path('update/<int:id>/', views.update),
path('delete/<int:id>/', views.delete),
path('search/', views.search),

]