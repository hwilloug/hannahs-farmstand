from django.contrib import admin
from django import forms
from .models import User, UserAddress

class UserAddressInline(admin.TabularInline):
    model = UserAddress

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name', 'created_at', 'modified_at')

    search_fields = ("username__startswith", )

    inlines = [
        UserAddressInline
    ]
