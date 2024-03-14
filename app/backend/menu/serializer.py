from menu.models import CategoryElement, Category, DishElement, Food, FoodElement, FoodType, Formula, Restaurant
from rest_framework import serializers

class FoodWithoutChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ('id','name', 'type', 'shortName')
    

class FoodElementSerializer(serializers.ModelSerializer):
    child = serializers.SerializerMethodField()
    class Meta:
        model = FoodElement
        fields = ('quantity', 'isVisible','child')  
    def get_child(self, instance):
        if instance.child.type != FoodType.CATEGORY.value:
            serializer = FoodSerializer(instance.child)
        else:
            serializer = FoodWithoutChildrenSerializer(instance.child)
        return serializer.data

class FoodSerializer(FoodWithoutChildrenSerializer):
    elements = serializers.SerializerMethodField()
    class Meta(FoodWithoutChildrenSerializer.Meta):
        fields = FoodWithoutChildrenSerializer.Meta.fields + ('elements', )  
    def get_elements(self, instance):
        serializer = FoodElementSerializer(instance.elements, many=True)
        return serializer.data


class FoodCategorySerializer(FoodWithoutChildrenSerializer):
    elements = serializers.SerializerMethodField()
    class Meta(FoodWithoutChildrenSerializer.Meta):
        fields = FoodWithoutChildrenSerializer.Meta.fields + ('elements', )  
    def get_elements(self, instance):
        elements = instance.elements.all()
        serialized_elements = []
        for element in elements:
            if element.child.type != FoodType.CATEGORY.value:
                serializer = FoodElementSerializer(element)
                serialized_elements.append(serializer.data)
            else:
                serializer = FoodElementSerializer(element.child.elements,context={'quantity': element.quantity}, many=True)
                serialized_elements.extend(serializer.data)  # Utilisez extend au lieu de append

        return serialized_elements

class DishElementSerializer(serializers.ModelSerializer):
    food = serializers.SerializerMethodField()
    class Meta:
        model = DishElement
        fields = ('id', 'name', 'food', 'order')
    def get_food(self, instance):
        if instance.food.type != FoodType.CATEGORY.value:
            serializer = FoodSerializer(instance.food)
        else:
            serializer = FoodWithoutChildrenSerializer(instance.food)
        return serializer.data

class FormulaSerializer(serializers.ModelSerializer):
    elements = serializers.SerializerMethodField()
    class Meta:
        model = Formula
        fields = ('id', 'price', 'elements', 'description')
    def get_elements(self, instance):
        elements = instance.elements.all()
        serialized_elements = []
        for element in elements:
            element_data = {
                'id': element.id,
                'dishElementId': element.dishElement_id,
                'order': element.order,
                'quantity': element.quantity,
            }
            serialized_elements.append(element_data)

        return serialized_elements

class CategoryElementSerializer(serializers.ModelSerializer):
    elements = serializers.SerializerMethodField()
    formulas = serializers.SerializerMethodField()
    formulaExtraPrices = serializers.SerializerMethodField()
    class Meta:
        model = CategoryElement
        fields = ('id', 'name', 'order', 'description', 'elements', 'formulas', 'formulaExtraPrices')
    def get_elements(self, instance):
        serializer = DishElementSerializer(instance.elements, many=True)
        return serializer.data
    def get_formulas(self, instance):
        serializer = FormulaSerializer(instance.formulas, many=True)
        return serializer.data
    def get_formulaExtraPrices(self, instance):
        serialized_elements = {}
        elements = instance.formulaExtraPrices.all()
        def add_elements_from_category(category_id, price):
            cat_elements = FoodElement.objects.filter(parent_id = category_id)
            for cat_element in cat_elements:
                if cat_element.child.type != FoodType.CATEGORY.value:
                    if not cat_element.child.id in serialized_elements:
                        serialized_elements[cat_element.child.id] = price
                else:
                    add_elements_from_category(cat_element.child.id, price)

        for element in elements:
            if element.food.type != FoodType.CATEGORY.value:
                serialized_elements[element.food_id] = element.price
            else:
                add_elements_from_category(element.food_id, element.price)

        return serialized_elements

class CategorySerializer(serializers.ModelSerializer):
    elements = serializers.SerializerMethodField()
    class Meta:
        model = Category
        fields = ('id', 'name', 'elements', 'shortDescription')
    def get_elements(self, instance):
        serializer = CategoryElementSerializer(instance.elements, many=True)
        return serializer.data
    
class RestaurantSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()
    foodcategories = serializers.SerializerMethodField()

    class Meta:
        model = Restaurant
        fields = ('id', 'name', 'address', 'categories', 'foodcategories', 'addressLink')
    def get_categories(self, instance):
        serializer = CategorySerializer(instance.categories, many=True)
        return serializer.data
    def get_foodcategories(self, instance):
        serializer = FoodSerializer(
            Food.objects.filter(type=FoodType.CATEGORY.value),
            many=True
        )
        return serializer.data
