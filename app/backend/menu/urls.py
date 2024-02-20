from django.urls import path, include
from menu.views import CategoryViewSet, FoodCategoryViewSet, FoodIngredientViewSet, FoodViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'category', CategoryViewSet)
router.register(r'foodcategory', FoodCategoryViewSet, basename='foodcategory')
router.register(r'ingredient', FoodIngredientViewSet, basename='ingredient')
router.register(r'dish', FoodViewSet)

urlpatterns = [
    path('menu/', include(router.urls)),  
]