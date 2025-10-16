from django.db import models

from django.contrib.auth.models import User




class Base(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class AssetType(models.Model):
    name = models.CharField(max_length=100, unique=True) 

    def __str__(self):
        return self.name


class Asset(models.Model):
    asset_type = models.ForeignKey(AssetType, on_delete=models.CASCADE)
    base = models.ForeignKey(Base, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)


class Purchase(models.Model):
    base = models.ForeignKey(Base, on_delete=models.CASCADE)
    asset_type = models.ForeignKey(AssetType, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    date = models.DateField()
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


class Transfer(models.Model):
    from_base = models.ForeignKey(Base, on_delete=models.CASCADE, related_name='transfers_out')
    to_base = models.ForeignKey(Base, on_delete=models.CASCADE, related_name='transfers_in')
    asset_type = models.ForeignKey(AssetType, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    date = models.DateField()
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


class Assignment(models.Model):
    personnel_name = models.CharField(max_length=100)
    base = models.ForeignKey(Base, on_delete=models.CASCADE)
    asset_type = models.ForeignKey(AssetType, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    date = models.DateField()
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


class Expenditure(models.Model):
    base = models.ForeignKey(Base, on_delete=models.CASCADE)
    asset_type = models.ForeignKey(AssetType, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    date = models.DateField()
    reason = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


class TransactionLog(models.Model):
    ACTION_CHOICES = [
        ('PURCHASE', 'Purchase'),
        ('TRANSFER', 'Transfer'),
        ('ASSIGN', 'Assignment'),
        ('EXPEND', 'Expenditure'),
    ]
    action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    details = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)