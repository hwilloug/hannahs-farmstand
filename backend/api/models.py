from django.db import models
from django.utils import timezone
import datetime

# User Management
class User(models.Model):
    username = models.CharField(max_length=15)
    password = models.CharField(max_length=64)
    first_name = models.CharField(max_length=24)
    last_name = models.CharField(max_length=24)
    telephone = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.username


class UserAddress(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.PROTECT)
    address_line1 = models.CharField(max_length=64)
    address_line2 = models.CharField(max_length=64)
    city = models.CharField(max_length=64)
    postal_code = models.CharField(max_length=6)
    country = models.CharField(max_length=64)
    telephone = models.IntegerField()


class UserPayment(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.PROTECT)
    payment_type = models.CharField(max_length=4)
    provider = models.CharField(max_length=64)
    account_no = models.IntegerField()
    expiry = models.DateField()


# Product Management
class ProductCategory(models.Model):
    name = models.CharField(max_length=64)
    desc = models.TextField(max_length=248)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True)


class ProductInventory(models.Model):
    quantity = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True)


class ProductDiscount(models.Model):
    name = models.CharField(max_length=64)
    desc = models.TextField(max_length=248)
    discount_percent = models.FloatField()
    active = models.BooleanField()
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True)


class Product(models.Model):
    name = models.CharField(max_length=64)
    desc = models.TextField(max_length=248)
    sku = models.CharField(max_length=64)
    category_id = models.ForeignKey(ProductCategory, on_delete=models.PROTECT)
    inventory_id = models.OneToOneField(ProductInventory, on_delete=models.CASCADE)
    price = models.FloatField()
    discount_id = models.ForeignKey(ProductDiscount, on_delete=models.PROTECT)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(blank=True)

# Shopping Process