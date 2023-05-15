from django.urls import path
from .views import PingView, ZipCodesView, CatAmenitiesParents

urlpatterns = [
    path('ping/', PingView.as_view(), name='hello_world'),
    path('zip-codes/<str:zip_code>/', ZipCodesView.as_view(), name='zip_codes'),
    path('cat-amenities-parents/', CatAmenitiesParents.as_view()),
]
