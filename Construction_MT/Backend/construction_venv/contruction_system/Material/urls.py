from django.urls import path
from .import  views
urlpatterns = [
    path('',views.get_all),
    path('getbyid/<int:id>/',views.get_by_id),
    path('delete/<int:id>/',views.delete_item),
    path('create/',views.create_item),
    path('update/<int:id>/',views.update_item),
    ]