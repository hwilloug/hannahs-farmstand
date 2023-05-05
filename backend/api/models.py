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
    

# Shopping Process