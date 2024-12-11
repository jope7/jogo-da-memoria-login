from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.contrib.auth.views import LoginView
from django.urls import path
from game import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("login/", LoginView.as_view(template_name="admin/login.html"), name="login"),
    path('game/', views.index, name="game"),
    path('rank/', views.ranking, name="ranking"),
    path("", views.menu, name="menu"),
    ]
