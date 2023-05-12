from rest_framework import serializers
from .models import User, UserAddress, Product, ProductCategory, ProductDiscount, Option, ProductInventory


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'created_at', 'modified_at']


class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ['id', 'address_line1', 'address_line2', 'city', 'state', 'postal_code', 'country', 'telephone']


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