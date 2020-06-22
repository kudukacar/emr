import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model, authenticate, login
from graphql_jwt.shortcuts import get_token
import graphql_jwt


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    user = graphene.Field(UserType)

    def resolve_users(self, info):
        return get_user_model().objects.all()

    def resolve_user(self, info):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided')
        return user


class LogIn(graphene.Mutation):
    user = graphene.Field(UserType)
    token = graphene.String()

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    @classmethod
    def mutate(cls, root, info, email, password):
        user = authenticate(email=email, password=password)

        if user is None:
            raise Exception('Please enter a correct username and password')

        login(info.context, user)
        return cls(user=user, token=get_token(user))


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)
    token = graphene.String()

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

        return CreateUser(user=user, token=get_token(user))


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    login = LogIn.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
