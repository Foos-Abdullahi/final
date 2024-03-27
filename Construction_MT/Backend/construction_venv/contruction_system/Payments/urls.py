from django.urls import path
from .import views
urlpatterns = [ 
    path('', views.getAll),
    path('view/<int:id>/', views.getById),
    path('addNew/', views.addNew),
    path('update/<int:id>/', views.update),
    path("delete/<int:id>/", views.delete)
]
