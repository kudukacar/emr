import json
from rest_framework import status
from rest_framework.test import APIClient
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

client = APIClient()


class CreateUserViewTest(TestCase):
    def setUp(self):
        self.user = {
            'email': 'user@email.com',
            'first_name': 'firstname',
            'last_name': 'lastname',
            'password': 'userpassword'
        }

        self.response = client.post(
            reverse('users'),
            data=json.dumps(self.user),
            content_type='application/json'
        )

    def test_status_code(self):
        self.assertEqual(self.response.status_code, 200)


class MyTokenObtainPairView(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(
            email='user@email.com',
            password='userpassword'
        )

        self.response = client.post(
            reverse('token_obtain_pair'),
            data=json.dumps({'email': 'user@email.com',
                             'password': 'userpassword'}),
            content_type='application/json'
        )

    def test_status_code(self):
        self.assertEqual(self.response.status_code, 200)

    def test_contains_expected_fields(self):
        self.assertEqual(set(self.response.data.keys()), set(
            ['id', 'first_name', 'last_name', 'email', 'token']))

    def test_contains_expected_tokens(self):
        self.assertIsInstance(self.response.data['token']['access'], str)
        self.assertIsInstance(self.response.data['token']['refresh'], str)
