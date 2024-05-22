from django.urls import path
from .import views
urlpatterns = [ 
    path('', views.getAll),
    path('view/<int:id>/', views.getById),
    path('addNew/', views.create),
    path('update/<int:id>/', views.update),
    path("delete/<int:id>/", views.delete),
    path('search/', views.search),
    path('get_invoices_by_ProjectNO/', views.get_invoices_by_ProjectNO, name='get_invoices_by_ProjectNO'),
]
