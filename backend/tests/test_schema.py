from django.contrib.auth import get_user_model
from graphene_django.utils.testing import GraphQLTestCase
from backend.schema import schema
from graphql_jwt.shortcuts import get_token
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
                    payload
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

        self.assertEqual(
            set(content['data']['login'].keys()), set(['token', 'user', 'payload']))
        self.assertEqual(
            set(content['data']['login']['payload'].keys()), set(['email', 'exp', 'origIat']))
        self.assertEqual(content['data']['login']
                         ['user']['email'], self.user.email)
        self.assertEqual(content['data']['login']
                         ['payload']['email'], self.user.email)

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
                        payload
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

        self.assertEqual(
            set(content.keys()), set(['errors', 'data']))
        self.assertEqual(content['errors'][0]['message'],
                         "Please enter a valid username and password.")


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
                    payload
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

        self.assertEqual(
            set(content['data']['createUser'].keys()), set(['token', 'user', 'payload']))
        self.assertEqual(
            set(content['data']['createUser']['payload'].keys()), set(['email', 'exp', 'origIat']))
        self.assertEqual(content['data']['createUser']
                         ['user']['email'], "user@email.com")
        self.assertEqual(content['data']['createUser']
                         ['payload']['email'], "user@email.com")

    def test_create_user_duplicate_email(self):

        User = get_user_model()
        password = "userpassword"
        user = User.objects.create_user(
            email='user@email.com',
            password=password
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
                    payload
                }
            }
            ''',
            op_name='createUser',
            variables={
                'email': user.email,
                'password': password,
                'firstName': "firstname",
                'lastName': "lastname"
            }
        )

        content = json.loads(response.content)

        self.assertEquals(
            set(content.keys()), set(['errors', 'data']))
        self.assertEquals(content['data']['createUser'],
                          None)


class ResolveUserTests(GraphQLTestCase):

    GRAPHQL_SCHEMA = schema

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            email='user@email.com',
            password='userpassword'
        )

    def test_resolve_user_successful(self):

        response = self.query(
            '''
            mutation login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    token
                    user {
                        id
                        email
                    }
                    payload
                }
            }
            ''',
            op_name='login',
            variables={
                'email': self.user.email,
                'password': 'userpassword'
            }
        )
        token = json.loads(response.content)['data']['login']['token']
        user_query = self.query(
            '''
            query {
                user {
                    email
                }
            }
            ''',
            headers={'Authorization': f'JWT {token}'}
        )

        response = json.loads(user_query.content)

        self.assertEqual(response['data']
                         ['user']['email'], self.user.email)

    def test_resolve_user_not_logged_in(self):

        user_query = self.query(
            '''
            query {
                user {
                    email
                }
            }
            ''',
            headers={'Authorization': f'JWT '}
        )

        response = json.loads(user_query.content)

        self.assertEqual(
            set(response.keys()), set(['errors', 'data']))
        self.assertEqual(response['data']['user'], None)
