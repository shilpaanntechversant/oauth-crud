from django.contrib.auth.models import User

from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    confirm_password = serializers.CharField(style={'input_type':'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username','password','email','confirm_password']

    def save(self):
        user_data = User(
            email = self.validated_data['email'],
            username = self.validated_data['username']
        )

        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']

        if password != confirm_password:
            raise serializers.ValidationError({
                'confirm_password': 'Password does not match'
                })
        user_data.set_password(password)
        user_data.save()
        return user_data
class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username','password']
        extra_kwargs = {
            'username': {'required': True},
            'password': {'required': True},

        }


    def validate(self, data):
        
        check_user = User.objects.filter(username=data['username']).exists()
        if check_user == False:
            raise serializers.ValidationError({'username':"User does not exist"})
        return data
    
   
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
    