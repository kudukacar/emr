from django.test import TestCase
from django.urls import reverse
from . import views


class IndexViewTest(TestCase):
    def test_view_url_exists_at_desired_location(self):
        response = self.client.get('')
        self.assertEqual(response.status_code, 200)

    def test_view_uses_correct_template(self):
        response = self.client.get('')
        self.assertTemplateUsed(response, 'frontend/index.html')
