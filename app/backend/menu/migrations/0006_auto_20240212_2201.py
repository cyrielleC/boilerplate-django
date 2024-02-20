# Generated by Django 3.2.23 on 2024-02-12 22:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0005_alter_pricesize_pizzamenu'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='foodelement',
            name='composite_primary_key',
        ),
        migrations.RemoveConstraint(
            model_name='foodelement',
            name='unique_element_order',
        ),
        migrations.AddField(
            model_name='basedish',
            name='order',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='restaurant',
            name='address',
            field=models.TextField(default='38 Rue de la Libération, 24400 Mussidan, France'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='basedish',
            name='price',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='food',
            name='description',
            field=models.CharField(max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='food',
            name='shortName',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='foodelementwithprice',
            name='quantity',
            field=models.IntegerField(default=1),
        ),
        migrations.AddConstraint(
            model_name='basedish',
            constraint=models.UniqueConstraint(fields=('food', 'category'), name='base_dish_composite_primary_key'),
        ),
        migrations.AddConstraint(
            model_name='foodelement',
            constraint=models.UniqueConstraint(fields=('parent', 'child'), name='food_element_composite_primary_key'),
        ),
        migrations.AddConstraint(
            model_name='foodelement',
            constraint=models.UniqueConstraint(fields=('parent', 'order'), name='food_element_unique_element_order'),
        ),
        migrations.AddConstraint(
            model_name='foodelementwithprice',
            constraint=models.UniqueConstraint(fields=('food', 'order'), name='food_element_with_price_unique_element_order'),
        ),
        migrations.AddConstraint(
            model_name='pricesize',
            constraint=models.UniqueConstraint(fields=('pizzaMenu', 'size'), name='price_size_composite_primary_key'),
        ),
    ]