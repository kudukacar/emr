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


class GetCurrentUserTest(TestCase):
    def setUp(self):
        self.user = {
            'email': 'user@email.com',
            'first_name': 'firstname',
            'last_name': 'lastname',
            'password': 'userpassword'
        }

        self.token = client.post(
            reverse('users'),
            data=json.dumps(self.user),
            content_type='application/json'
        ).data.get('token')

    def test_status_code(self):
        client.credentials(HTTP_AUTHORIZATION=f'JWT {self.token}')
        response = client.get(reverse('currentuser'))
        print(response.data)
        self.assertEqual(response.status_code, 200)
