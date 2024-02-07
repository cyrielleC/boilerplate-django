from django.db import models

class FoodCategory(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    
    
class Food(models.Model):
    name = models.CharField(max_length=200)
    ingredientList = models.CharField(max_length=1000)

    ingredients = models.ManyToManyField('Food', symmetrical=False)
    categories = models.ManyToManyField('FoodCategory', related_name='food')

    def __str__(self):
        return self.name

class Element(models.Model):
    quantity = models.IntegerField
    food = models.ForeignKey('Food', on_delete=models.CASCADE)
    menu = models.ForeignKey('Menu', on_delete=models.CASCADE)
    optional = models.BooleanField
    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name
        
class Menu(models.Model):
    name = models.CharField(max_length=200)
    categories = models.ForeignKey('Category', on_delete=models.CASCADE, null = True)

    def __str__(self):
        return self.name