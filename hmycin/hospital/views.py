# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import generics
from .models import Enfermedad, Sintoma
from .serializers import EnfermedadSerializer, SintomaSerializer, UserSerializer
import django_filters
from rest_framework import viewsets
from django.contrib.auth.models import User
from hospital import handler


class Pagination(PageNumberPagination):
    page_size = 50

    def get_paginated_response(self, data):
        return Response({
            'links': {
               'next': self.get_next_link(),
               'previous': self.get_previous_link()
            },
            'total_pages': self.page.paginator.num_pages,
            'count': self.page.paginator.count,
            'results': data
})

class UserProfile(APIView):
    def get(self, request, format=None):
        user = request.user
        profile = user.profile
        return Response(profile.tipo)

class ConsultaView(APIView):
    def get(self, request, format=None):
        resutl = handler.enfermedades()
        return Response(result)


class EnfermedadList(generics.ListCreateAPIView):
    queryset = Enfermedad.objects.all()
    serializer_class = EnfermedadSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('nombre', 'nombre_enf')
    pagination_class = Pagination


class EnfermedadDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Enfermedad.objects.all()
    serializer_class = EnfermedadSerializer
    lookup_field = 'pk'
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)


class SintomaList(generics.ListCreateAPIView):
    queryset = Sintoma.objects.all()
    serializer_class = SintomaSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('nombre', 'nombre_sint', 'enfermedad')
    pagination_class = Pagination


class SintomaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sintoma.objects.all()
    serializer_class = SintomaSerializer
    lookup_field = 'pk'
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    pagination_class = Pagination
