from django.urls import path, include
from menu.views import CategoryViewSet, FoodCategoryDViewSet, FoodCategoryIViewSet, FoodCreateAPIView, FoodDishViewSet, FoodIngredientViewSet, FoodUpdateAPIView, FoodViewSet, RestaurantViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'category', CategoryViewSet)
router.register(r'food/category_i', FoodCategoryIViewSet, basename='foodcategoryi')
router.register(r'food/category_d', FoodCategoryDViewSet, basename='foodcategoryd')
router.register(r'food/ingredient', FoodIngredientViewSet, basename='ingredient')
router.register(r'food/dish', FoodDishViewSet)
router.register(r'food2', FoodUpdateAPIView, basename="coucou")
router.register(r'food', FoodViewSet)

router.register(r'restaurant', RestaurantViewSet)

urlpatterns = [
    path('menu/', include(router.urls)),  
    path('menu/food/', FoodCreateAPIView.as_view()),
]