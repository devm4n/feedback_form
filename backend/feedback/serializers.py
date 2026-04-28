from rest_framework import serializers

from .models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        # user = User.objects.create(
        #     validated_data["username"],
        #     validated_data["email"],
        #     validated_data["feedback"],
        # )
        #
        # user.save()
        # return user
        return User.objects.create(**validated_data)
