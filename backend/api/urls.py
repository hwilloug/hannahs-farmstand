from django.urls import path
from .user_views import (
    UserListApiView,
    UserDetailApiView,
    UserAddressApiView,
    UserAddressDetailApiView,
    UserOrderApiView,
    UserOrderDetailApiView,
    WhoAmIView,
    UserCartApiView,
    UserCartDetailApiView
)
from .product_views import (
    ProductListApiView,
    ProductDetailApiView
)

urlpatterns = [
    path('whoami/', WhoAmIView.as_view()),
    path('users/', UserListApiView.as_view()),
    path('users/<int:user_id>/', UserDetailApiView.as_view()),
    path('users/<int:user_id>/addresses/', UserAddressApiView.as_view()),
    path('users/<int:user_id>/addresses/<int:address_id>/', UserAddressDetailApiView.as_view()),
    path('users/<int:user_id>/orders/', UserOrderApiView.as_view()),
    path('users/<int:user_id>/orders/<int:order_id>/', UserOrderDetailApiView.as_view()),
    path('users/<int:user_id>/cart/', UserCartApiView.as_view()),
    path('users/<int:user_id>/cart/<int:cart_item_id>/', UserCartDetailApiView.as_view()),
    path('products/', ProductListApiView.as_view()),
    path('products/<int:product_id>/', ProductDetailApiView.as_view())
]