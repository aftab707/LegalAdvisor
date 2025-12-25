from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError
# Create your views here.

@api_view(['POST'])
def signin_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    # 1. Check if email exists in database
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"success": False, "error": "User with this email does not exist"}, status=404)

    # 2. Check if the password matches
    # Note: For production, you should use hashed passwords (check_password), 
    # but for now we are checking plain text based on your previous code.
    if user.check_password(password):
       # GET OR CREATE TOKEN
       token, _ = Token.objects.get_or_create(user=user)
       return Response({
            "token":token.key,
            "success": True, 
            "user": {
                "name": user.username,  
                "email": user.email
            }
        })
    else:
        return Response({"success": False, "error": "Invalid password"}, status=400)

@api_view(['POST'])
def signup_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    # Basic Validation
    if not username or not email or not password:
        return Response({"success":False, "error":"All fields are required"})
    # Check if email already exists
    if User.objects.filter(email=email).exists():
        return Response({"success":False, "error":"Email already registered try another email" }, status=400)
    

    try:
        # Create user 
        user = User.objects.create_user(username=username, email=email, password=password)

        # Create a token for each user 
        token = Token.objects.create(user=user)

        return Response({
            "success":True,
            "token":Token.key,
            "user":{
                "username":user.username,
                "email":user.email
            }
        }, status=201)

    except IntegrityError:
        return Response({"success":False, "error":"Database error occured"}, status=500)
    except Exception as e:
        return Response({"success":False, "error":str(e)}, status=500)



