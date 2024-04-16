from django.urls import path
from .import views

# urls.py


urlpatterns = [
# path('', views.index, name='index'),
path('', views.getAll),
path('view/<int:id>/', views.getById),
path('create/', views.create),
path('update/<int:id>/', views.update),
path('delete/<int:id>/', views.delete),

]