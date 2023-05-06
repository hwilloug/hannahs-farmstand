from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import User, UserAddress
from .serializers import UserSerializer, UserAddressSerializer

class UserListApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        '''
        List all the users
        '''
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        '''
        Create the User with given user data
        '''
        data = {
            'username': request.data.get('username'), 
            'password': request.data.get('password'), 
            'first_name': request.data.get('first_name'),
            'last_name': request.data.get('last_name'),
            'telephone': request.data.get('telephone')
        }
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserDetailApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, user_id):
        '''
        Helper method to get the object with given user_id
        '''
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None
        
    def get(self, request, user_id, *args, **kwargs):
        '''
        Retrieves the user with given user_id
        '''
        user_instance = self.get_object(user_id)
        if not user_instance:
            return Response(
                {"res": "Object with user id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = UserSerializer(user_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, user_id, *args, **kwargs):
        '''
        Updates the user with given user_id if exists
        '''
        user_instance = self.get_object(user_id)
        if not user_instance:
            return Response(
                {"res": "Object with user id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        data = {
            'username': request.data.get('username'), 
            'password': request.data.get('password'), 
            'first_name': request.data.get('first_name'),
            'last_name': request.data.get('last_name'),
            'telephone': request.data.get('telephone')
        }
        serializer = UserSerializer(instance=user_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id, *args, **kwargs):
        '''
        Deletes the user with given user_id if exists
        '''
        user_instance = self.get_object(user_id)
        if not user_instance:
            return Response(
                {"res": "Object with user id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        user_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )
    

class UserAddressApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, user_id):
        '''
        Helper method to get the object with given user_id
        '''
        try:
            return User.objects.filter(id=user_id)
        except User.DoesNotExist:
            return []

    def get_address_object(self, user_id):
        '''
        Helper method to get the object with given user_id
        '''
        try:
            return UserAddress.objects.filter(user_id=user_id)
        except UserAddress.DoesNotExist:
            return []
        
    def get(self, request, user_id, *args, **kwargs):
        '''
        Retrieves the user address with given user_id
        '''
        user_instance = self.get_object(user_id)
        if not user_instance:
            return Response(
                'Object with id does not exist',
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user_address_instance = self.get_address_object(user_id)
        if not user_address_instance:
            return Response(
                [],
                status=status.HTTP_200_OK
            )

        serializer = UserAddressSerializer(user_address_instance, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        '''
        Create the User Address with given address data
        '''
        data = {
            'user_id': request.data.get('user_id'), 
            'address_line1': request.data.get('address_line1'), 
            'address_line2': request.data.get('address_line2'),
            'city': request.data.get('city'),
            'postal_code': request.data.get('postal_code'),
            'country': request.data.get('country'),
            'telephone': request.data.get('telephone'),
        }
        serializer = UserAddressSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserAddressDetailApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, user_id):
        '''
        Helper method to get the object with given user_id
        '''
        try:
            return User.objects.filter(id=user_id)
        except User.DoesNotExist:
            return []

    def get_address_object(self, address_id, user_id):
        '''
        Helper method to get the object with given user_id
        '''
        try:
            return UserAddress.objects.get(user_id=user_id, id=address_id)
        except UserAddress.DoesNotExist:
            return None
        
    def get(self, request, user_id, address_id, *args, **kwargs):
        '''
        Retrieves the user address with given user_id
        '''
        user_instance = self.get_object(user_id)
        if not user_instance:
            return Response(
                'Object with id does not exist',
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user_address_instance = self.get_address_object(address_id, user_id)
        if not user_address_instance:
            return Response(
                'Object with id does not exist',
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = UserAddressSerializer(user_address_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, user_id, address_id, *args, **kwargs):
        '''
        Updates the user address with given user_id if exists
        '''
        user_instance = self.get_object(user_id)
        if not user_instance:
            return Response(
                {"res": "Object with user id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user_address_instance = self.get_address_object(user_id)
        if not user_address_instance:
            return Response(
                {"res": "Object with user id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        data = {
            'user_id': request.data.get('user_id'), 
            'address_line1': request.data.get('address_line1'), 
            'address_line2': request.data.get('address_line2'),
            'city': request.data.get('city'),
            'postal_code': request.data.get('postal_code'),
            'country': request.data.get('country'),
            'telephone': request.data.get('telephone'),
        }
        serializer = UserAddressSerializer(instance=user_address_instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id, *args, **kwargs):
        '''
        Deletes the user with given user_id if exists
        '''
        user_address_instance = self.get_address_object(user_id)
        if not user_address_instance:
            return Response(
                {"res": "Object with user id does not exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        user_address_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )