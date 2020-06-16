from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class CustomUserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    token = serializers.SerializerMethodField()
    email = serializers.EmailField(required=True)

    def get_token(self, user):
        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    def create(self, validated_data):
        user = self.Meta.model(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password', 'first_name',
                  'last_name', 'token')


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['email'] = self.user.email
        data['first_name'] = self.user.first_name
        data['last_name'] = self.user.last_name
        data['id'] = self.user.id
        data['token'] = {
            'refresh': data['refresh'],
            'access': data['access']
        }
        data.pop('refresh')
        data.pop('access')
        return data
