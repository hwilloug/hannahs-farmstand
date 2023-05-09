from django.urls import path
from .user_views import (
    UserListApiView,
    UserDetailApiView,
    UserAddressApiView,
    UserAddressDetailApiView,
    UserPaymentApiView,
    UserPaymentDetailApiView
)
from .product_views import (
    ProductListApiView,
    ProductDetailApiView
)

urlpatterns = [
    path('users/', UserListApiView.as_view()),
    path('users/<int:user_id>/', UserDetailApiView.as_view()),
    path('users/<int:user_id>/addresses/', UserAddressApiView.as_view()),
    path('users/<int:user_id>/addresses/<int:address_id>/', UserAddressDetailApiView.as_view()),
    path('users/<int:user_id>/payments/', UserPaymentApiView.as_view()),
    path('users/<int:user_id>/payments/<int:payment_id>/', UserPaymentDetailApiView.as_view()),
    path('products/', ProductListApiView.as_view()),
    path('products/<int:product_id>/', ProductDetailApiView.as_view())
]