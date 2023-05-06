from django.urls import path
from .views import (
    UserListApiView,
    UserDetailApiView
)

urlpatterns = [
    path('users/', UserListApiView.as_view()),
    path('users/<int:user_id>/', UserDetailApiView.as_view())
]