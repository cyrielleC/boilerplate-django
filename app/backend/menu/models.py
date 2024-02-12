from django.db import models

class Restaurant(models.Model):
    name = models.CharField(max_length=200)
    address = models.TextField()
    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=200)
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class MenuType(models.TextChoices):
    SEVERALSIZE = 'SEVERALSIZE'
    FORMULA = 'FORMULA'
    SIMPLE = 'SIMPLE'

class BaseDish(models.Model):
    name = models.CharField(max_length=200, null = True)
    description = models.CharField(max_length=200, null = True)
    price = models.FloatField(null = True)
    quantity = models.IntegerField(default=1)
    food = models.ForeignKey('Food', on_delete=models.PROTECT, related_name='menuDishes', db_index=True)
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='elements', db_index=True)
    extras = models.ManyToManyField('FoodElementWithPrice')
    order = models.IntegerField()
    type = models.CharField(
        max_length=20,
        choices=[(tag, tag.value) for tag in MenuType],
        default=MenuType.SIMPLE.value
    )
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['food', 'category'], name='base_dish_composite_primary_key'),
            models.UniqueConstraint(fields=['category', 'order'], name='base_dish_unique_element_order')
     ]
    def __str__(self):
        return self.name

class PriceSize(models.Model):
    pizzaMenu = models.ForeignKey('BaseDish', on_delete=models.CASCADE, related_name="prices", db_index=True)
    size = models.ForeignKey('PizzaSize', on_delete=models.CASCADE)
    price = models.FloatField()
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['pizzaMenu', 'size'], name='price_size_composite_primary_key'),
        ]

class PizzaSize(models.Model):
    name = models.CharField(max_length=200)

class Formula(BaseDish):
    starter = models.ForeignKey('Food', on_delete=models.PROTECT, related_name='menStartes', null = True, db_index=True)
    dessert = models.ForeignKey('Food', on_delete=models.PROTECT, related_name='menuDesserts', null = True, db_index=True)
    starterDishPrice = models.FloatField(null = True)
    dishDessertPrice = models.FloatField(null=True)
    allPrice = models.FloatField(null=True)

class FoodElementWithPrice(models.Model):
    quantity = models.IntegerField(default=1)
    food = models.ForeignKey('Food', on_delete=models.PROTECT, related_name='extras', db_index=True)
    price = models.FloatField()
    includedNumber = models.IntegerField(default=0)
    order = models.IntegerField()
    def __str__(self):
        return self.name
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['food', 'order'], name='food_element_with_price_unique_element_order')
        ]

class FoodType(models.TextChoices):
    DISH = 'DISH'
    CATEGORY = 'CATEGORY'
    INGREDIENT = 'INGREDIENT'

class Food(models.Model):
    name = models.CharField(max_length=200)
    shortName = models.CharField(max_length=200, null = True)
    description = models.CharField(max_length=1000, null = True)
    type = models.CharField(
        max_length=20,
        choices=[(tag, tag.value) for tag in FoodType],
        default=FoodType.INGREDIENT.value
    )
    def __str__(self):
        return self.name
    
class FoodElement(models.Model):
    quantity = models.IntegerField(default=1)
    parent = models.ForeignKey('Food', on_delete=models.CASCADE, related_name='elements', db_index=True)
    child = models.ForeignKey('Food', on_delete=models.CASCADE, db_index=True)
    isVisible = models.BooleanField(default=True)
    order = models.IntegerField()
    def __str__(self):
        return str(self.quantity) + ' ' + self.food.name + ' ' + str(self.isVisible) + ' ' + str(self.order)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['parent', 'child'], name='food_element_composite_primary_key'),
            models.UniqueConstraint(fields=['parent', 'order'], name='food_element_unique_element_order')
        ]
