import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model, authenticate, login
from graphql_jwt.shortcuts import get_token
from graphql_jwt.utils import get_payload
import graphql_jwt
from graphene.types.generic import GenericScalar


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class Query(graphene.ObjectType):
    user = graphene.Field(UserType)

    def resolve_user(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Authentication failed.')
        return user


class LogIn(graphene.Mutation):
    user = graphene.Field(UserType)
    token = graphene.String()
    payload = GenericScalar()

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    @classmethod
    def mutate(cls, root, info, email, password):
        user = authenticate(email=email, password=password)

        if user is None:
            raise Exception('Please enter a valid email and password.')

        login(info.context, user)
        token = get_token(user)
        return cls(user=user, token=token, payload=get_payload(token))


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)
    token = graphene.String()
    payload = GenericScalar()

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        firstName = graphene.String()
        lastName = graphene.String()

    def mutate(self, info, email, password, firstName, lastName):
        user = get_user_model()(
            email=email,
            first_name=firstName,
            last_name=lastName
        )
        user.set_password(password)
        user.save()
        token = get_token(user)
        return CreateUser(user=user, token=token, payload=get_payload(token))


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    login = LogIn.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
