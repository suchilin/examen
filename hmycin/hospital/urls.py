from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers
from hospital import views

router = routers.DefaultRouter()
router.register(r'accounts', views.UserView, 'list')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^enfermedades/$', views.EnfermedadList.as_view()),
    url(r'^enfermedades/(?P<pk>\d+)/$', views.EnfermedadDetail.as_view()),
    url(r'^sintomas/$', views.SintomaList.as_view()),
    url(r'^sintomas/(?P<pk>\d+)/$', views.SintomaDetail.as_view()),
    url(r'^uprofile/$', views.UserProfile.as_view()),
    url(r'^consulta/$', views.ConsultaView.as_view()),
]
