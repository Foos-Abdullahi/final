from django.urls import path
from .import views

urlpatterns = [
path('', views.getAll),
path('view/<int:id>/', views.getById),
path('delete/<int:id>/', views.delete),
path('create/', views.create),
path('update/<int:id>/', views.update),
path('search/', views.search),
<<<<<<< HEAD
path('get_usersBy_role_name/', views.get_usersBy_role_name, name='get_usersBy_role_name'),
=======
path('get_usersBy_role_name/', views.get_usersBy_role_name, name="get_usersBy_role_name"),
>>>>>>> 9a63c91427720704d79cb7842fba5f8c986a45ae
]