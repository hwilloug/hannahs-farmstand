from django.contrib import admin
from .models import User, UserAddress, UserPayment

class UserAddressInline(admin.TabularInline):
    model = UserAddress


class UserPaymentInline(admin.TabularInline):
    model = UserPayment
    

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name', 'created_at', 'modified_at')

    search_fields = ("username__startswith", )

    inlines = [
        UserAddressInline,
        UserPaymentInline
    ]
