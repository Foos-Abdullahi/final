from django.urls import path
from .import views
urlpatterns = [
    path('',views.getAll),
    path('detils/<int:id>/',views.GetById),
    path('delete/<int:id>/',views.delete),
    path('addnew/',views.Addnew),
    path('update/<int:id>/',views.Update)
    ]