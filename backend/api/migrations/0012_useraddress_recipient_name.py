# Generated by Django 4.2.1 on 2023-05-13 01:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_remove_user_password_alter_user_first_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraddress',
            name='recipient_name',
            field=models.CharField(default='Hannah Willoughby', max_length=64),
            preserve_default=False,
        ),
    ]