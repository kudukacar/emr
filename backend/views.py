from django.shortcuts import render
from .serializers import CustomUserSerializer, MyTokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView


class CreateUserView(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = ()

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
