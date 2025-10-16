from rest_framework import serializers
from .models import Base, AssetType, Purchase, Transfer, Assignment, Expenditure

class BaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Base
        fields = '__all__'

class AssetTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetType
        fields = '__all__'

class PurchaseSerializer(serializers.ModelSerializer):
    base_name = serializers.CharField(source='base.name', read_only=True)
    asset_type_name = serializers.CharField(source='asset_type.name', read_only=True)
    class Meta:
        model = Purchase
        fields = '__all__'

class TransferSerializer(serializers.ModelSerializer):
    from_base_name = serializers.CharField(source='from_base.name', read_only=True)
    to_base_name = serializers.CharField(source='to_base.name', read_only=True)
    asset_type_name = serializers.CharField(source='asset_type.name', read_only=True)
    class Meta:
        model = Transfer
        fields = '__all__'

class AssignmentSerializer(serializers.ModelSerializer):
    base_name = serializers.CharField(source='base.name', read_only=True)
    asset_type_name = serializers.CharField(source='asset_type.name', read_only=True)
    class Meta:
        model = Assignment
        fields = '__all__'

class ExpenditureSerializer(serializers.ModelSerializer):
    base_name = serializers.CharField(source='base.name', read_only=True)
    asset_type_name = serializers.CharField(source='asset_type.name', read_only=True)
    class Meta:
        model = Expenditure
        fields = '__all__'