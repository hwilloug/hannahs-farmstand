# Generated by Django 4.2.1 on 2023-05-13 12:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_orderdetail_recipient_name_orderdetail_state_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='OrderItems',
            new_name='OrderItem',
        ),
    ]
