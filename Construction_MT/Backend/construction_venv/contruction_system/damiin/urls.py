from django.urls import path
from .import views

urlpatterns = [
path('', views.getAll),
path('view/<int:id>/', views.getById),
path('delete/<int:id>/', views.delete),
path('create/', views.createDamiin),
path('update/<int:id>/', views.update),
]