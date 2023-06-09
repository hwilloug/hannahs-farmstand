# Generated by Django 4.2.1 on 2023-05-07 15:26

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_product_deleted_at_alter_product_img1_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='inventory_id',
        ),
        migrations.AddField(
            model_name='option',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='option',
            name='deleted_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='option',
            name='modified_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='productinventory',
            name='product_id',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.product'),
            preserve_default=False,
        ),
    ]
