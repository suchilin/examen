from rest_framework import serializers
from .models import Enfermedad, Sintoma, Profile
from django.contrib.auth.models import User

class EnfermedadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enfermedad
        fields = '__all__'

class SintomaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sintoma
        fields = '__all__'


class UserSerializer(serializers.HyperlinkedModelSerializer):
    tipo = serializers.CharField(source='profile.tipo')
    class Meta:
        model = User
        fields = ('id','username','password', 'first_name', 'last_name', 'email','tipo',)

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)
        user = super(UserSerializer, self).create(validated_data)
        self.update_or_create_profile(user, profile_data)
        password = validated_data.pop('password', None)
        #instance = self.Meta.model(**validated_data)
        if password is not None:
            user.set_password(password)
        user.save()
        return user

    def update_or_create_profile(self, user, profile_data):
        Profile.objects.update_or_create(user=user, defaults=profile_data)
