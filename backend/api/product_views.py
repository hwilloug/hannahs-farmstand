from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product, ProductInventory, ProductDiscount, ProductCategory, ProductOption, Option
from .serializers import ProductSerializer, ProductInventorySerializer, ProductDiscountSerializer, ProductCategorySerializer, OptionSerializer

class ProductListApiView(APIView):
    def get(self, request, *args, **kwargs):
        '''
        List all the products
        '''
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)

        enriched_products = []
        i = 0
        for product in serializer.data:
            enriched_products.append(product)
            
            inventory = ProductInventory.objects.get(product_id=product['id'])
            inventory_serializer = ProductInventorySerializer(inventory)
            enriched_products[i]['quantity'] = inventory_serializer.data['quantity']

            if product['discount_id']:
                discount = ProductDiscount.objects.get(id=product['discount_id'])
                discount_serializer = ProductDiscountSerializer(discount)
                enriched_products[i]['discount'] = discount_serializer.data
                
            category = ProductCategory.objects.get(id=product['category_id'])
            category_serializer = ProductCategorySerializer(category)
            enriched_products[i]['category'] = category_serializer.data

            i += 1

        return Response(enriched_products, status=status.HTTP_200_OK)
    

class ProductDetailApiView(APIView):
    def get(self, request, product_id, *args, **kwargs):
        '''
        Detail view of a product with a given product_id
        '''
        product_instance = Product.objects.get(id=product_id)
        if not product_instance:
            return Response(
                {'res': 'Object with product id does not exist'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = ProductSerializer(product_instance)

        enriched_product = serializer.data
        
        inventory = ProductInventory.objects.get(product_id=serializer.data['id'])
        inventory_serializer = ProductInventorySerializer(inventory)
        enriched_product['quantity'] = inventory_serializer.data['quantity']

        if serializer.data['discount_id']:
            discount = ProductDiscount.objects.get(id=serializer.data['discount_id'])
            discount_serializer = ProductDiscountSerializer(discount)
            enriched_product['discount'] = discount_serializer.data
            
        category = ProductCategory.objects.get(id=serializer.data['category_id'])
        category_serializer = ProductCategorySerializer(category)
        enriched_product['category'] = category_serializer.data

        product_options = ProductOption.objects.filter(product_id=serializer.data['id'])
        options = []
        for product_option in product_options:
            option = Option.objects.get(id=product_option['option_id'])
            option_serializer = OptionSerializer(option)
            options.append(option_serializer.data)
        enriched_product['options'] = options

        return Response(enriched_product, status=status.HTTP_200_OK)