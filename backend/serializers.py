from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'first_name', 'last_name')


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        user = self.Meta.model(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = get_user_model()
        fields = ('token', 'email', 'password', 'first_name', 'last_name')
