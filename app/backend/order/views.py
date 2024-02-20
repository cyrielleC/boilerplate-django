from datetime import datetime, timedelta
import random
from order.serializer import OrderSerializer
from rest_framework.generics import ListAPIView
from rest_framework import permissions, generics
from .models import Order
from django.utils import timezone

# Create your views here.
class OrderListView(ListAPIView):
    serializer_class = OrderSerializer
    # permission_classes = [permissions.IsAuthenticated]  # Ajoutez les permissions nécessaires

    def get_queryset(self):
        date_param = self.kwargs.get('date', '')
        service_type = self.kwargs.get('service_type', 'N')

        try:
            date = datetime.strptime(date_param, '%Y%m%d')
            start_time = timezone.make_aware(datetime.combine(date, datetime.min.time()) + timedelta(hours=12), timezone=timezone.utc) if service_type == 'N' else timezone.make_aware(datetime.combine(date, datetime.min.time()) + timedelta(hours=18), timezone=timezone.utc)
            end_time = start_time + timedelta(hours=6)

            # Filtrer les commandes dans cette plage horaire
            queryset = Order.objects.filter(takeOutDate__gte=start_time, takeOutDate__lt=end_time)
            return queryset

        except ValueError:
            pass  # Gestion d'une date invalide ou d'un autre problème

        return Order.objects.none()
    

class OrderCreateListView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(
            user=user,
            number=generate_order_number(user.username),
            creationDate=timezone.now()
        )

    def get_queryset(self):
        return Order.objects.all()
    

def generate_order_number(username):
    random_number = random.randint(1000, 9999)
    return f"{random_number}-{username}"