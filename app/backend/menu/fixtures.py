from menu.models import BaseDish, Category, Food, FoodElement, Formula, MenuType, Restaurant, FoodType, PriceSize, PizzaSize

# f1 = Food(name = 'sauce tomate', type = FoodType.INGREDIENT.value)
# f1.save()

# f3 = Food(name = 'base crème', type = FoodType.INGREDIENT.value)
# f3.save()

# c = Food(name="base au choix", shortName = "BAC", type = FoodType.CATEGORY.value)
# c.save()
# c2 = Food(name="pizza", type = FoodType.CATEGORY.value)
# c2.save()

# FoodElement.objects.create(child = f1, order =1, parent = c)
# FoodElement.objects.create(child = f3, order =2, parent = c)

# f2 = Food(name = "mozzarella", type = FoodType.INGREDIENT.value)
# f2.save()

# f = Food(name = "Margherita", type = FoodType.DISH.value)
# f.save()

# FoodElement.objects.create(child = f2, order = 2, parent = f)
# FoodElement.objects.create(child = c, order = 1, parent = f)

# FoodElement.objects.create(child = f, order = 1, parent = c2)

# r = Restaurant(name = 'Napolizza')
# r.save()

# c = Category(name = 'Les classiques', restaurant = r)
# c.save()

# ps = PizzaSize(name="Pizza")
# ps.save()
# ps2 = PizzaSize(name="Pizzeti")
# ps2.save()

# margmenu = BaseDish(category= c, food= f, type = MenuType.SEVERALSIZE.value)
# margmenu.save()
# PriceSize.objects.create(size= ps, price= 9.5, pizzaMenu = margmenu)
# PriceSize.objects.create(size= ps2, price= 5, pizzaMenu = margmenu)

c = Category.objects.get(pk = 1)

# test = Formula(
#     category= c, 
#     food= Food.objects.create(name="lasagnes", type = FoodType.DISH.value),
#     dessert= Food.objects.create(name="tiramisu", type = FoodType.DISH.value),
#     type = MenuType.SEVERALSIZE.value,
#     price = 12,
#     dishDessertPrice = 14
# )
# test.save()

print(c.elements.first());
# ### Cas à gérer :
# # menu midi/soir, entrée, entrée plat dessert, dessert plat, 6 sushis, entrée optionnelle, choix d'ingrédient