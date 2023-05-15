from django.db import models

class State(models.Model):
    id = models.BigAutoField(primary_key=True)
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)

class County(models.Model):
    id = models.BigAutoField(primary_key=True)
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=250)
    state = models.ForeignKey(State, on_delete=models.CASCADE)

class Settlement(models.Model):
    id = models.BigAutoField(primary_key=True)
    code = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=250)
    postal_code = models.CharField(max_length=10)
    zone_type = models.CharField(max_length=20)
    settlement_type = models.CharField(max_length=30)
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    county = models.ForeignKey(County, on_delete=models.CASCADE)