from django.contrib import admin
from django.urls import path

from feedback import views

urlpatterns = [
    path("api/", views.RegisterUser.as_view()),
    path("admin/", admin.site.urls),
]
