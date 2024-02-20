# generate_json.py
import json

from menu.models import Category, Restaurant
from menu.serializer import CategorySerializer, RestaurantSerializer

def generate_json_file(restaurantId):
    queryset = Restaurant.objects.filter(number=restaurantId).first()
    serializer = RestaurantSerializer(queryset)
    json_data = serializer.data

    with open('/src/assets/json/menu.json', 'w', encoding='utf-8') as json_file:
        json.dump(json_data, json_file, ensure_ascii=False)


generate_json_file('23JR58J3F95')

