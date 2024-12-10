# from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path, include
from game import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', include('game.urls')),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('register/', views.register, name='register'),
]
