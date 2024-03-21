from menu.models import CategoryElement, Category, DishElement, Food, FoodElement, Formula, FormulaElement, Restaurant, FoodType

f1 = Food(name = 'sauce tomate', type = FoodType.INGREDIENT.value)
f1.save()

f3 = Food(name = 'base crème', type = FoodType.INGREDIENT.value)
f3.save()

c = Food(name="base au choix", shortName = "BAC", type = FoodType.CATEGORY_I.value)
c.save()
c2 = Food(name="pizza", type = FoodType.CATEGORY_D.value)
c2.save()

FoodElement.objects.create(child = f1, order =1, parent = c)
FoodElement.objects.create(child = f3, order =2, parent = c)

f2 = Food(name = "mozzarella", type = FoodType.INGREDIENT.value)
f2.save()

f = Food(name = "Margherita", type = FoodType.DISH.value)
f.save()

FoodElement.objects.create(child = f2, order = 2, parent = f)
FoodElement.objects.create(child = c, order = 1, parent = f)

FoodElement.objects.create(child = f, order = 1, parent = c2)

r = Restaurant(name = 'Napolizza')
r.save()

c = Category(name = 'Les classiques', restaurant = r)
c.save()

margmenu = CategoryElement(category= c, order = 2)
margmenu.save()
de = DishElement.objects.create(food= f, categoryElement = margmenu)
fo1 = Formula.objects.create(price= 9.5, categoryElement = margmenu, description='Pizza')
fo2 = Formula.objects.create(price= 5.5, categoryElement = margmenu, description='Pizzetti')
FormulaElement.objects.create(formula = fo1, dishElement = de, order= 1)
FormulaElement.objects.create(formula = fo2, dishElement = de, order= 1)


dessert = Food.objects.create(name="dessert", type = FoodType.CATEGORY_D.value)
dessert1 = Food.objects.create(name="tiramisu", type = FoodType.DISH.value)
dessert2 = Food.objects.create(name="tarte citron", type = FoodType.DISH.value)

FoodElement.objects.create(child = dessert1, order =2, parent = dessert)
FoodElement.objects.create(child = dessert2, order =1, parent = dessert)



margmenu = CategoryElement(category= c, order = 1)
margmenu.save()
pdj = Food.objects.create(name="lasagnes", type = FoodType.DISH.value)
de = DishElement.objects.create(food= pdj, categoryElement = margmenu)
dessertEl = DishElement.objects.create(food= dessert, categoryElement = margmenu)
fo1 = Formula.objects.create(price= 12, categoryElement = margmenu, description='Plat')
fo2 = Formula.objects.create(price= 14, categoryElement = margmenu, description='Plat Dessert')
FormulaElement.objects.create(formula = fo1, dishElement = de, order= 1)
FormulaElement.objects.create(formula = fo2, dishElement = de, order= 1)
FormulaElement.objects.create(formula = fo2, dishElement = dessertEl, order= 2)


# ### Cas à gérer :
# # menu midi/soir, entrée, entrée plat dessert, dessert plat, 6 sushis, entrée optionnelle, choix d'ingrédient