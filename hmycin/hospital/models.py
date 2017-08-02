# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

class Enfermedad(models.Model):
    nombre = models.CharField(max_length=200)
    nombre_enf = models.CharField(max_length=200)
    link_desc = models.CharField(max_length=200)
    class Meta:
        db_table = 'enfermedad'

class Sintoma(models.Model):
    nombre = models.CharField(max_length=200)
    nombre_sint = models.CharField(max_length=200)
    link_desc = models.CharField(max_length=200)
    enfermedad = models.ForeignKey(Enfermedad)
    class Meta:
        db_table='sintoma'

class Profile(models.Model):
    TIPO = (
        ('M', 'medico'),
        ('P', 'practicante'),
        ('A', 'administrador'),
    )

    user = models.OneToOneField(User)
    tipo = models.CharField(max_length=1, choices=TIPO)

    def __unicode__(self):
        return u'Perfil de usuario: {0}'.format(self.user.username)
