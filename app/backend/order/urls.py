from django.urls import path, include
from order.models import Order, PriceFoodElement
from pprint import pprint
from datetime import datetime, timedelta
from django.db.models import Q

from . import views

# class PriceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PriceSize
#         fields = ('size','price')

# class OrderViewSet(viewsets.ModelViewSet):
#     queryset = Order.objects.filter(
#         Q(takeOutDate__gte=start_time) & Q(takeOutDate__lte=end_time)
#     )
#     serializer_class = FoodWithoutChildrenSerializer


urlpatterns = [
    path('order/<str:date>/<str:service_type>/', views.OrderListView.as_view(), name='order-list'),
    path('order/', views.OrderCreateListView.as_view(), name='order-list-create'),
]