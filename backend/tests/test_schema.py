from django.contrib.auth import get_user_model
from graphene_django.utils.testing import GraphQLTestCase
from backend.schema import schema
import json


class LoginTests(GraphQLTestCase):

    GRAPHQL_SCHEMA = schema

    def setUp(self):
        User = get_user_model()
        self.password = 'userpassword'
        self.user = User.objects.create_user(
            email='user@email.com',
            password=self.password
        )

    def test_login_successful(self):

        response = self.query(
            '''
            mutation login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    token
                    user {
                        id
                        email
                    }
                }
            }
            ''',
            op_name='login',
            variables={
                'email': self.user.email,
                'password': self.password
            }
        )

        content = json.loads(response.content)

        self.assertEquals(
            set(content['data']['login'].keys()), set(['token', 'user']))
        self.assertEquals(content['data']['login']
                          ['user']['email'], self.user.email)

    def test_unsuccessful_login(self):

        response = self.query(
            '''
                mutation login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        token
                        user {
                            id
                            email
                        }
                    }
                }
                ''',
            op_name='login',
            variables={
                'email': 'notuser@email.com',
                'password': self.password
            }
        )

        content = json.loads(response.content)

        self.assertEquals(
            set(content.keys()), set(['errors', 'data']))
        self.assertEquals(content['errors'][0]['message'],
                          "Please enter a correct username and password")


class CreateUserTests(GraphQLTestCase):

    GRAPHQL_SCHEMA = schema

    def test_create_user_successful(self):

        response = self.query(
            '''
            mutation createUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
                createUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
                    token
                    user {
                        id
                        email
                    }
                }
            }
            ''',
            op_name='createUser',
            variables={
                'email': "user@email.com",
                'password': "userpassword",
                'firstName': "firstname",
                'lastName': "lastname"
            }
        )

        content = json.loads(response.content)

        self.assertEquals(
            set(content['data']['createUser'].keys()), set(['token', 'user']))
        self.assertEquals(content['data']['createUser']
                          ['user']['email'], "user@email.com")

    def test_create_user_duplicate_email(self):

        User = get_user_model()
        self.user = User.objects.create_user(
            email='user@email.com',
            password="userpassword"
        )

        response = self.query(
            '''
            mutation createUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
                createUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
                    token
                    user {
                        id
                        email
                    }
                }
            }
            ''',
            op_name='createUser',
            variables={
                'email': "user@email.com",
                'password': "userpassword",
                'firstName': "firstname",
                'lastName': "lastname"
            }
        )

        content = json.loads(response.content)

        self.assertEquals(
            set(content.keys()), set(['errors', 'data']))
        self.assertEquals(content['data']['createUser'],
                          None)
