from django.shortcuts import render
from menu.models import Category, Food, FoodType, Restaurant
from menu.serializer import CategorySerializer, FoodCreateSerializer, FoodSerializer, FoodSerializer, FoodWithoutChildrenSerializer, RestaurantSerializer
from rest_framework import viewsets, generics, permissions
from django.db.models import Q

# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class FoodCategoryViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.filter(Q(type=FoodType.CATEGORY_I.value) | Q(type=FoodType.CATEGORY_D.value))
    serializer_class = FoodSerializer

class FoodCreateAPIView(generics.CreateAPIView):
    serializer_class = FoodCreateSerializer

class FoodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer


class FoodIngredientViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.filter(type=FoodType.INGREDIENT.value)
    serializer_class = FoodWithoutChildrenSerializer

class RestaurantViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer