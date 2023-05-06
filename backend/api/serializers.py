from rest_framework import serializers
from .models import User, UserAddress


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'telephone', 'created_at', 'modified_at']


class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ['address_line1', 'address_line2', 'city', 'postal_code', 'country', 'telephone']