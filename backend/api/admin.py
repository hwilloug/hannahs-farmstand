from django.contrib import admin
from .models import User, UserAddress, Product, ProductCategory, ProductInventory, ProductDiscount, ProductOption, Option

class UserAddressInline(admin.TabularInline):
    model = UserAddress
    

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name', 'created_at', 'modified_at')

    search_fields = ("username__startswith", )

    inlines = [
        UserAddressInline
    ]

class ProductInventoryInline(admin.TabularInline):
    model = ProductInventory

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'desc', 'img1', 'img2', 'sku', 'category_id', 'price', 'discount_id', 'created_at', 'modified_at', 'deleted_at')

    search_fields = ('name__startswith', )

    inlines = [
        ProductInventoryInline
    ]
    

@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'desc', 'created_at', 'modified_at', 'deleted_at')


@admin.register(ProductDiscount)
class ProductDiscountAdmin(admin.ModelAdmin):
    list_display = ('name', 'desc', 'discount_percent', 'active', 'created_at', 'modified_at', 'deleted_at')


@admin.register(Option)
class OptionAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'modified_at', 'deleted_at')