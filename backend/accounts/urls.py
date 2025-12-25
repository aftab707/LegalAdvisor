from django.urls import path
from .views import signin_user, signup_user

urlpatterns =[
    path('login/', signin_user),
    path('signup/', signup_user)

]