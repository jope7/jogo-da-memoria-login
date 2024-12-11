from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path
from game import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('game/', views.index, name="game"),
    path('rank/', views.ranking, name="ranking"),
    path("", views.menu, name="menu"),
]
