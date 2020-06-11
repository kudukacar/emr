from django.test import TestCase
from django.contrib.auth import get_user_model


class CustomUserManagerTest(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(
            email='user@email.com', password='userpassword')
        self.superuser = User.objects.create_superuser(
            email='superuser@email.com', password='superuserpassword')

    def test_create_user(self):
        self.assertEqual(self.user.email, 'user@email.com')
        self.assertTrue(self.user.is_active)
        self.assertFalse(self.user.is_staff)
        self.assertFalse(self.user.is_superuser)
        self.assertIsNone(self.user.username)

    def test_create_superuser(self):
        self.assertEqual(self.superuser.email, 'superuser@email.com')
        self.assertTrue(self.superuser.is_active)
        self.assertTrue(self.superuser.is_staff)
        self.assertTrue(self.superuser.is_superuser)
        self.assertIsNone(self.superuser.username)
