from django.test import TestCase
from django.contrib.auth import get_user_model


class CustomUserManagerTests(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(
            email='user@email.com', password='userpassword')
        self.assertEqual(user.email, 'user@email.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertIsNone(user.username)

    def test_create_superuser(self):
        User = get_user_model()
        superuser = User.objects.create_superuser(
            email='superuser@email.com', password='superuserpassword')
        self.assertEqual(superuser.email, 'superuser@email.com')
        self.assertTrue(superuser.is_active)
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)
        self.assertIsNone(superuser.username)
