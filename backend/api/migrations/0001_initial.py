# Generated by Django 4.2.1 on 2023-05-06 13:03

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Option',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='OrderDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total', models.FloatField()),
                ('tax', models.FloatField()),
                ('shipping_cost', models.FloatField()),
                ('address_line1', models.CharField(max_length=64)),
                ('address_line2', models.CharField(max_length=64)),
                ('city', models.CharField(max_length=64)),
                ('postal_code', models.CharField(max_length=6)),
                ('country', models.CharField(max_length=64)),
                ('telephone', models.IntegerField()),
                ('tracking_no', models.CharField(max_length=40)),
                ('shipped', models.BooleanField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('modified_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='PaymentDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField()),
                ('provider', models.CharField(max_length=24)),
                ('status', models.CharField(max_length=12)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('modified_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('desc', models.TextField(max_length=248)),
                ('sku', models.CharField(max_length=64)),
                ('price', models.FloatField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('modified_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('desc', models.TextField(max_length=248)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('modified_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductDiscount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('desc', models.TextField(max_length=248)),
                ('discount_percent', models.FloatField()),
                ('active', models.BooleanField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('modified_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductInventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('modified_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=248)),
                ('password', models.CharField(max_length=248)),
                ('first_name', models.CharField(max_length=64)),
                ('last_name', models.CharField(max_length=64)),
                ('telephone', models.IntegerField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('modified_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='UserPayment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_type', models.CharField(max_length=4)),
                ('provider', models.CharField(max_length=64)),
                ('account_no', models.IntegerField()),
                ('expiry', models.DateField()),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='UserAddress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address_line1', models.CharField(max_length=64)),
                ('address_line2', models.CharField(max_length=64)),
                ('city', models.CharField(max_length=64)),
                ('postal_code', models.CharField(max_length=6)),
                ('country', models.CharField(max_length=64)),
                ('telephone', models.IntegerField()),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='ShoppingSession',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total', models.FloatField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('modified_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.user')),
            ],
        ),
        migrations.CreateModel(
            name='ProductOptions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('option_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.option')),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.product')),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='category_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.productcategory'),
        ),
        migrations.AddField(
            model_name='product',
            name='discount_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.productdiscount'),
        ),
        migrations.AddField(
            model_name='product',
            name='inventory_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.productinventory'),
        ),
        migrations.CreateModel(
            name='OrderItems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('modified_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('order_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.orderdetails')),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.product')),
            ],
        ),
        migrations.AddField(
            model_name='orderdetails',
            name='payment_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.paymentdetails'),
        ),
        migrations.AddField(
            model_name='orderdetails',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.user'),
        ),
        migrations.CreateModel(
            name='CartItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('modified_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('product_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.product')),
                ('session_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='api.shoppingsession')),
            ],
        ),
    ]
