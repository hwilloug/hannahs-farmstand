from rest_framework import serializers
from .models import User, UserAddress, Product, ProductCategory, ProductDiscount, Option, ProductInventory, OrderDetail, CartItem, PaymentDetail, OrderItem


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'created_at', 'modified_at']


class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ['id', 'recipient_name', 'address_line1', 'address_line2', 'city', 'state', 'postal_code', 'country', 'telephone', 'user_id']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'desc', 'img1', 'img2', 'sku', 'category_id', 'price', 'discount_id', 'created_at', 'modified_at', 'deleted_at']


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'name', 'desc', 'created_at', 'modified_at', 'deleted_at']


class ProductDiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDiscount
        fields = ['id', 'name', 'desc', 'discount_percent', 'active', 'created_at', 'modified_at', 'deleted_at']


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'name', 'created_at', 'modified_at', 'deleted_at']


class ProductInventorySerializer(serializers.ModelSerializer):
    class Meta: 
        model = ProductInventory
        fields = ['id', 'quantity', 'product_id', 'created_at', 'modified_at', 'deleted_at']


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = ['id', 'user_id', 'total', 'tax', 'shipping_cost', 'payment_id', 'address_line1', 'address_line2', 'city', 'state', 'postal_code', 'country', 'telephone', 'tracking_no', 'shipped', 'created_at', 'modified_at']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'order_id', 'product_id', 'quantity', 'created_at', 'modified_at']


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'user_id', 'product_id', 'quantity', 'created_at', 'modified_at']


class PaymentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentDetail
        fields = ['id', 'amount', 'provider', 'status', 'created_at', 'modified_at']
