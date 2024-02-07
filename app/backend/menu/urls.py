from django.urls import path, include
from menu.models import Element, Menu, Category, Food
from rest_framework import routers, serializers, viewsets

from . import views


class FoodSerializer(serializers.ModelSerializer):
    ingredients = serializers.SerializerMethodField()
    class Meta:
        model = Food
        fields = ('id','name', 'ingredients')  # Ajoutez les champs que vous souhaitez inclure dans la sérialisation des menus
    def get_ingredients(self, instance):
        serializer = FoodSerializer(instance.ingredients, many=True)
        return serializer.data

class ElementSerializer(serializers.ModelSerializer):
    food = FoodSerializer(many=False, read_only=True)
    class Meta:
        model = Element
        fields = ('id', 'food')  # Ajoutez les champs que vous souhaitez inclure dans la sérialisation des menus

class MenuSerializer(serializers.ModelSerializer):
    elements = ElementSerializer(many=True, read_only=True, source='element_set')
    class Meta:
        model = Menu
        fields = ('id', 'name', 'elements')  # Ajoutez les champs que vous souhaitez inclure dans la sérialisation des menus

class CategorySerializer(serializers.ModelSerializer):
    menus = MenuSerializer(many=True, read_only=True, source='menu_set')

    class Meta:
        model = Category
        fields = ('id', 'name', 'menus')

# ViewSets define the view behavior.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'category', CategoryViewSet)

urlpatterns = [
    path('menu/', include(router.urls)),
]