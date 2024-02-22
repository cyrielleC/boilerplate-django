from django.db import models

class Restaurant(models.Model):
    name = models.CharField(max_length=200)
    number= models.CharField(max_length=50)
    address = models.TextField()
    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=200)
    shortDescription = models.CharField(max_length=200, null = True)
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE, related_name='categories')
    def __str__(self):
        return self.name

class CategoryElement(models.Model):
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='elements', db_index=True)
    name = models.CharField(max_length=200, null = True)
    description = models.CharField(max_length=200, null = True)
    extras = models.ManyToManyField('FoodElementWithPrice')
    order = models.IntegerField()
    def __str__(self):
        return self.name
    class Meta:
        ordering = ['order']


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
        ordering = ['order']
    
class DishElement(models.Model):
    name = models.CharField(max_length=200)
    quantity = models.IntegerField(default=1)
    categoryElement = models.ForeignKey('CategoryElement', on_delete=models.CASCADE, related_name='elements', db_index=True)
    food = models.ForeignKey('Food', on_delete=models.CASCADE, db_index=True)
    order = models.IntegerField()
    def __str__(self):
        return str(self.quantity) + ' ' + self.categoryElement + ' ' + self.food
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['food', 'categoryElement'], name='dish_element_composite_primary_key'),
            models.UniqueConstraint(fields=['categoryElement', 'order'], name='dish_element_unique_element_order')
        ]
        ordering = ['order']
    
class Formula(models.Model):
    price = models.FloatField()
    description = models.CharField(max_length=200, null = True)
    categoryElement = models.ForeignKey('CategoryElement', on_delete=models.CASCADE, related_name='formulas', db_index=True)

class FormulaElement(models.Model):
    formula = models.ForeignKey('Formula', on_delete=models.CASCADE, related_name='elements', db_index=True)
    dishElement = models.ForeignKey('DishElement', on_delete=models.CASCADE, db_index=True)
    order = models.IntegerField()
    def __str__(self):
        return self.formula + ' ' + self.dishElement + str(self.order)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['formula', 'dishElement'], name='formula_element_composite_primary_key'),
            models.UniqueConstraint(fields=['formula', 'order'], name='formula_element_unique_element_order')
        ]
