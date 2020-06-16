from django.test import SimpleTestCase, TestCase
from django.contrib.auth import get_user_model
from backend.serializers import CustomUserSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class CustomUserSerializerTest(SimpleTestCase):
    def setUp(self):
        email = 'user@gmail.com'
        first_name = 'firstname'
        last_name = 'lastname'
        self.user_attributes = {
            'id': None,
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
        }
        User = get_user_model()
        self.user = User(email=email, password='userpassword',
                         first_name=first_name, last_name=last_name)
        self.serializer = CustomUserSerializer(instance=self.user)
        self.invalid_user = User(
            email='email', password='userpassword', first_name=first_name, last_name=last_name)
        self.invalid_serializer = CustomUserSerializer(
            data=self.invalid_user)

    def test_contains_fields(self):
        self.assertEqual(set(self.serializer.data.keys()),
                         set(['id', 'email', 'first_name', 'last_name', 'token']))

    def test_contains_expected_email(self):
        self.assertEqual(
            self.serializer.data['email'], self.user_attributes['email'])

    def test_contains_expected_first_name(self):
        self.assertEqual(
            self.serializer.data['first_name'], self.user_attributes['first_name'])

    def test_contains_expected_last_name(self):
        self.assertEqual(
            self.serializer.data['last_name'], self.user_attributes['last_name'])

    def test_contains_expected_tokens(self):
        self.assertIsInstance(self.serializer.data['token']['access'], str)
        self.assertIsInstance(self.serializer.data['token']['refresh'], str)

    def test_email_validation(self):
        self.assertFalse(self.invalid_serializer.is_valid())
        self.assertIsNotNone(
            self.invalid_serializer.errors['non_field_errors'])


class MyTokenObtainPairSerializerTest(SimpleTestCase):
    def setUp(self):
        self.email = 'user@gmail.com'
        self.password = 'userpassword'
        User = get_user_model()
        self.user = User(email=self.email, password=self.password)

        self.serializer = MyTokenObtainPairSerializer(
            {'email': self.email, 'password': self.password})

    def test_contains_fields(self):
        self.assertEqual(set(self.serializer.data.keys()),
                         set(['email']))

    def test_contains_expected_email(self):
        self.assertEqual(
            self.serializer.data['email'], self.email)
