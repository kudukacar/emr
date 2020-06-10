from django.test import SimpleTestCase
from django.contrib.auth import get_user_model
from backend.serializers import UserSerializer, UserSerializerWithToken


class UserSerializerTest(SimpleTestCase):
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
        self.serializer = UserSerializer(instance=self.user)

    def test_contains_expected_data(self):
        self.assertEqual(self.serializer.data, self.user_attributes)


class UserSerializerWithTokenTest(SimpleTestCase):
    def setUp(self):
        email = 'user@gmail.com'
        first_name = 'firstname'
        last_name = 'lastname'
        self.new_user_attributes = {
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
            'token': '',
        }
        User = get_user_model()
        self.new_user = User(email=email, password='userpassword',
                             first_name=first_name, last_name=last_name)
        self.serializer = UserSerializerWithToken(instance=self.new_user)

    def test_contains_expected_fields(self):
        self.assertCountEqual(self.serializer.data.keys(),
                              self.new_user_attributes)

    def test_email_value(self):
        self.assertEqual(
            self.serializer.data['email'], self.new_user_attributes['email'])

    def test_first_name_value(self):
        self.assertEqual(
            self.serializer.data['first_name'], self.new_user_attributes['first_name'])

    def test_last_name_value(self):
        self.assertEqual(
            self.serializer.data['last_name'], self.new_user_attributes['last_name'])
