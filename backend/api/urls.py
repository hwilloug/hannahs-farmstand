from django.urls import path
from .user_views import (
    UserListApiView,
    UserDetailApiView,
    UserAddressApiView,
    UserAddressDetailApiView,
    UserPaymentApiView,
    UserPaymentDetailApiView
)

urlpatterns = [
    path('users/', UserListApiView.as_view()),
    path('users/<int:user_id>/', UserDetailApiView.as_view()),
    path('users/<int:user_id>/addresses/', UserAddressApiView.as_view()),
    path('users/<int:user_id>/addresses/<int:address_id>/', UserAddressDetailApiView.as_view()),
    path('users/<int:user_id>/payments/', UserPaymentApiView.as_view()),
    path('users/<int:user_id>/payments/<int:payment_id>/', UserPaymentDetailApiView.as_view())
]