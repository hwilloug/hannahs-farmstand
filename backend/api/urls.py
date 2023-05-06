from django.urls import path
from .views import (
    UserListApiView,
    UserDetailApiView,
    UserAddressApiView,
    UserAddressDetailApiView
)

urlpatterns = [
    path('users/', UserListApiView.as_view()),
    path('users/<int:user_id>/', UserDetailApiView.as_view()),
    path('users/<int:user_id>/addresses/', UserAddressApiView.as_view()),
    path('users/<int:user_id>/addresses/<int:address_id>/', UserAddressDetailApiView.as_view())
]