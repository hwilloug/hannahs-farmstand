from rest_framework import serializers
from .models import User, UserAddress, UserPayment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'created_at', 'modified_at']


class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ['address_line1', 'address_line2', 'city', 'postal_code', 'country', 'telephone']


class UserPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPayment
        fields = ['payment_type', 'provider', 'account_no', 'expiry']