from django.db import models

class OrderState(models.TextChoices):
    PENDING = 'PENDING'
    PROCESSING = 'PROCESSING'
    READY = 'READY'
    WITHDRAWN = 'WITHDRAWN'
    CANCELLED = 'CANCELLED'
    FAILED = 'FAILED'

class Order(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    address = models.TextField()
    number = models.CharField(max_length=200)
    creationDate = models.DateTimeField()
    takeOutDate = models.DateTimeField()
    total = models.FloatField()
    state = models.CharField(
        max_length=20,
        choices=[(tag, tag.value) for tag in OrderState],
        default=OrderState.PENDING.value
    )
    paymentStatus = models.BooleanField(default = False)

class PriceFoodElement(models.Model):
    formula = models.ManyToManyField('menu.Formula')
    price = models.FloatField()
    order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name = 'elements')
