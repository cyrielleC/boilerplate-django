from django.urls import path, include
from menu.models import BaseDish, Category, Food, FoodElement, FoodType, Formula, MenuType, PriceSize
from rest_framework import routers, serializers, viewsets
from pprint import pprint

from . import views


class FoodSerializer(serializers.ModelSerializer):
    ingredients = serializers.SerializerMethodField()
    class Meta:
        model = Food
        fields = ('id','name', 'ingredients', 'type')  
    def get_ingredients(self, instance):
        serializer = FoodElementSerializer(instance.elements, many=True)
        return serializer.data
    
class FoodWithoutChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ('id','name', 'type')

class FoodElementSerializer(serializers.ModelSerializer):
    child = serializers.SerializerMethodField()
    class Meta:
        model = FoodElement
        fields = ('quantity', 'isVisible','child')  
    def get_child(self, instance):
        if instance.child.type == FoodType.CATEGORY.value:
            serializer = FoodCategorySerializer(instance.child)
        else:
            serializer = FoodWithoutChildrenSerializer(instance.child)
        return serializer.data

class FoodCategorySerializer(serializers.ModelSerializer):
    foods = serializers.SerializerMethodField()
    class Meta:
        model = Food
        fields = ('id','name', 'foods')  
    def get_foods(self, instance):
        serializer = FoodElementSerializer(instance.elements, many=True)
        return serializer.data

class SimpleDishSerializer(serializers.ModelSerializer):
    food = serializers.SerializerMethodField()
    class Meta:
        model = BaseDish
        fields = ('id', 'name', 'description', 'quantity', 'food', 'price')
    def get_food(self, instance):
        serializer = FoodSerializer(instance.food)
        return serializer.data

class MenuSerializer(SimpleDishSerializer):
    starter = serializers.SerializerMethodField()
    dessert = serializers.SerializerMethodField()
    class Meta:
        model = Formula
        fields = SimpleDishSerializer.Meta.fields + ('starter', 'dessert', 'dishDessertPrice','starterDishPrice','allPrice', )
    def get_starter(self, instance):
        serializer = FoodSerializer(instance.starter)
        return serializer.data
    def get_dessert(self, instance):
        serializer = FoodSerializer(instance.dessert)
        return serializer.data
    
class SeveralSizeSerializer(SimpleDishSerializer):
    prices = serializers.SerializerMethodField()
    class Meta:
        model = BaseDish
        fields = SimpleDishSerializer.Meta.fields + ('prices',)
    def get_prices(self, instance):
        serializer = PriceSerializer(instance.prices, many = True)
        return serializer.data

class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceSize
        fields = ('size','price')

class CategorySerializer(serializers.ModelSerializer):
    menus = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ('id', 'name', 'menus')
    def get_menus(self, instance):
        elements = instance.elements.all()  # Supposons que elements est un queryset
        serialized_menus = []
        for element in elements:
            if element.type == MenuType.SIMPLE.value:
                serializer = SimpleDishSerializer(element)
            elif element.type == MenuType.SEVERALSIZE.value:
                serializer = SeveralSizeSerializer(element)
            else:
                serializer = MenuSerializer(Formula.objects.get(pk = element.id))
            serialized_menus.append(serializer.data)
        return serialized_menus

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class FoodCategoryViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.filter(type=FoodType.CATEGORY.value)
    serializer_class = FoodCategorySerializer


class FoodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.filter(type=FoodType.DISH.value)
    serializer_class = FoodSerializer


class FoodIngredientViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.filter(type=FoodType.INGREDIENT.value)
    serializer_class = FoodWithoutChildrenSerializer


router = routers.DefaultRouter()
router.register(r'category', CategoryViewSet)
router.register(r'foodcategory', FoodCategoryViewSet, basename='foodcategory')
router.register(r'ingredient', FoodIngredientViewSet, basename='ingredient')
router.register(r'food', FoodViewSet)

urlpatterns = [
    path('menu/', include(router.urls)),  
]