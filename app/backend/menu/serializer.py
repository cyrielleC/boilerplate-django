from menu.models import BaseDish, Category, Food, FoodElement, FoodType, Formula, MenuType, DishSize, PriceSize, Restaurant
from rest_framework import serializers

class FoodWithoutChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ('id','name', 'type', 'shortName')
    
class DishSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DishSize
        fields = ('id','name')

class FoodElementSerializer(serializers.ModelSerializer):
    child = serializers.SerializerMethodField()
    class Meta:
        model = FoodElement
        fields = ('quantity', 'isVisible','child')  
    def get_child(self, instance):
        if instance.child.type == FoodType.CATEGORY.value:
            serializer = FoodSerializer(instance.child)
        else:
            serializer = FoodWithoutChildrenSerializer(instance.child)
        return serializer.data

class FoodSerializer(serializers.ModelSerializer):
    elements = serializers.SerializerMethodField()
    class Meta:
        model = Food
        fields = FoodWithoutChildrenSerializer.Meta.fields + ('elements', )  
    def get_elements(self, instance):
        serializer = FoodElementSerializer(instance.elements, many=True)
        return serializer.data

class SimpleDishSerializer(serializers.ModelSerializer):
    food = serializers.SerializerMethodField()
    class Meta:
        model = BaseDish
        fields = ('id', 'name', 'type', 'description', 'quantity', 'food', 'price')
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
        fields = ('id', 'name', 'menus', 'shortDescription')
    def get_menus(self, instance):
        elements = instance.elements.all()
        serialized_menus = []
        for element in elements:
            if element.type == MenuType.SIMPLE.value:
                serializer = SimpleDishSerializer(element)
            elif element.type == MenuType.SEVERALSIZE.value:
                serializer = SeveralSizeSerializer(element)
            else:
                serializer = MenuSerializer(Formula.objects.get(pk=element.id))
            serialized_menus.append(serializer.data)
        return serialized_menus
    
class RestaurantSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()
    foodcategories = serializers.SerializerMethodField()
    sizes = serializers.SerializerMethodField()

    class Meta:
        model = Restaurant
        fields = ('id', 'name', 'address', 'categories', 'foodcategories', 'sizes',)
    def get_categories(self, instance):
        serializer = CategorySerializer(instance.categories, many=True)
        return serializer.data
    def get_foodcategories(self, instance):
        serializer = FoodSerializer(
            Food.objects.filter(type=FoodType.CATEGORY.value),
            many=True
        )
        return serializer.data
    def get_sizes(self, instance):
        serializer = DishSizeSerializer(
            DishSize.objects.all(),
            many=True
        )
        return serializer.data
