from django.urls import path, include
from menu.views import CategoryViewSet, FoodCategoryViewSet, FoodCreateAPIView, FoodIngredientViewSet, FoodViewSet, RestaurantViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'category', CategoryViewSet)
router.register(r'foodcategory', FoodCategoryViewSet, basename='foodcategory')
router.register(r'ingredient', FoodIngredientViewSet, basename='ingredient')
router.register(r'food', FoodViewSet)
router.register(r'restaurant', RestaurantViewSet)

urlpatterns = [
    path('menu/', include(router.urls)),  
    path('menu/food/', FoodCreateAPIView.as_view()),
]