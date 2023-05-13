from django.db import models
from django.utils import timezone

# User Management
class User(models.Model):
    username = models.CharField(max_length=248)
    first_name = models.CharField(max_length=64, blank=True, null=True)
    last_name = models.CharField(max_length=64, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.username


class UserAddress(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.PROTECT)
    recipient_name = models.CharField(max_length=64)
    address_line1 = models.CharField(max_length=64)
    address_line2 = models.CharField(max_length=64, null=True, blank=True)
    city = models.CharField(max_length=64)
    state = models.CharField(max_length=2)
    postal_code = models.CharField(max_length=6)
    country = models.CharField(max_length=64)
    telephone = models.IntegerField()


# Product Management
class ProductCategory(models.Model):
    name = models.CharField(max_length=64)
    desc = models.TextField(max_length=248)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name


class ProductDiscount(models.Model):
    name = models.CharField(max_length=64)
    desc = models.TextField(max_length=248)
    discount_percent = models.FloatField()
    active = models.BooleanField()
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.discount_percent}%"


class Option(models.Model):
    name = models.CharField(max_length=64)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=64)
    desc = models.TextField(max_length=248)
    img1 = models.URLField(null=True, blank=True)
    img2 = models.URLField(null=True, blank=True)
    sku = models.CharField(max_length=64)
    category_id = models.ForeignKey(ProductCategory, on_delete=models.PROTECT)
    price = models.FloatField()
    discount_id = models.ForeignKey(ProductDiscount, on_delete=models.PROTECT, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name


class ProductInventory(models.Model):
    quantity = models.IntegerField()
    product_id = models.OneToOneField(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.quantity}"


class ProductOption(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.PROTECT)
    option_id = models.ForeignKey(Option, on_delete=models.PROTECT)


# Shopping Process
class ShoppingSession(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.PROTECT)
    total = models.FloatField()
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)


class CartItem(models.Model):
    session_id = models.ForeignKey(ShoppingSession, on_delete=models.PROTECT)
    product_id = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)


class PaymentDetails(models.Model):
    amount = models.FloatField()
    provider = models.CharField(max_length=24)
    status = models.CharField(max_length=12)
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)


class OrderDetails(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.PROTECT)
    total = models.FloatField()
    tax = models.FloatField()
    shipping_cost = models.FloatField()
    payment_id = models.OneToOneField(PaymentDetails, on_delete=models.CASCADE)
    address_line1 = models.CharField(max_length=64)
    address_line2 = models.CharField(max_length=64)
    city = models.CharField(max_length=64)
    postal_code = models.CharField(max_length=6)
    country = models.CharField(max_length=64)
    telephone = models.IntegerField()
    tracking_no = models.CharField(max_length=40)
    shipped = models.BooleanField()
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)


class OrderItems(models.Model):
    order_id = models.ForeignKey(OrderDetails, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now)
    modified_at = models.DateTimeField(default=timezone.now)