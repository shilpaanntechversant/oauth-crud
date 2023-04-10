from datetime import datetime
import requests
import json
from django.shortcuts import render
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User

from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from oauth2_provider.models import Application, AccessToken


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from rest_framework.response import Response


from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from .paginations import CustomPagination




# Create your views here.
class Register(APIView):
    def post(self, request, format=None):
        reg_serializers = RegisterSerializer(data=request.data)
        data={}
        if reg_serializers.is_valid():
            serialize_data= reg_serializers.save()
            application = Application.objects.create(
                user=serialize_data,
                client_type='public',
                authorization_grant_type='password'
            )
            data['status']={
                            "code": 200,
                            "message": "Successfully Registered"
                        }
            data['results'] ={}
            status = 200
        else:
            data['status']={
                        "code": 422,
                        'message': 'Validation Error'
                    }
            data['results'] =reg_serializers.errors
            status =422
        return Response(data,status)
    
class Login(APIView):
    permission_classes = (AllowAny,)
    def post(self, request, format=None):
        login_serializers = LoginSerializer(data=request.data)
        data={}
        if login_serializers.is_valid():

            user = authenticate(username=request.data['username'], password=request.data['password'])
            if user is not None:
                login(request, user)
                time_threshold = datetime.now()
                print(time_threshold)
                # token_obj = AccessToken.objects.filter(user=user,expires__gt=time_threshold)
                token_obj = AccessToken.objects.filter(user=user)
                if token_obj:
                    token=token_obj[0].token
                else:
                    if not Application.objects.filter(user=user).exists():
                        application = Application.objects.create(
                            user=user,
                            client_type='public',
                            authorization_grant_type='password'
                        )
                    application =Application.objects.filter(user=user)
                    if application:
                        application = application[0]
                        client_id = application.client_id
                        client_secret = application.client_secret
                        url = 'http://'+request.get_host()+'/o/token/'
                        data_dict = {"grant_type" :"password",
                                     "username":  request.data['username'],
                                     "password": request.data['password'],
                                     "client_id": client_id
                                     }
                        access_token = requests.post(url, data_dict)
                        data =json.loads(access_token.text)
                        print(data)
                        print(data_dict)
                        token = data.get('access_token', '')

                
                
                data['status']={
                                "code": 200,
                                "message": "Successfully Logged In"
                            }
                data['results'] ={
                    'token':token,
                    'username':request.user.username,
                    'email':request.user.email,
                    'id':request.user.id
                }
                status = 200
                return Response(data,status=status)
            else:
            
                data['status']={
                        "code": 422,
                        'message': 'Validation Error'
                    }
                data['results'] ={'username':{'Wrong username and password'}}
                status =422
                return Response(data,status=status)
        else:
            data['status']={
                        "code": 422,
                        'message': 'Validation Error'
                    }
            data['results'] =login_serializers.errors
            status =422
            return Response(data,status=status)


class UserList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,TokenHasReadWriteScope,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
    pagination_class = CustomPagination


class UserDetails(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,TokenHasReadWriteScope,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

