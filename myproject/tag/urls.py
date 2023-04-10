from django.urls import path
from .views import *


urlpatterns = [
    path('list', TagListView.as_view()),
    path('', TagApiView.as_view()),
    path('<str:pk>', TagApiView.as_view()), # to capture our ids

]