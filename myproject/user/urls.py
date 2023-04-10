from django.urls import path
from .views import *


urlpatterns = [
    path('register', Register.as_view(), name='register'),
    path('login', Login.as_view(), name='login'),
    path('', UserList.as_view()),
    path('<str:pk>', UserDetails.as_view()), # to capture our ids

]