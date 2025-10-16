from django.contrib import admin
from .models import Base, AssetType, Purchase, Transfer, Assignment, Expenditure, TransactionLog

@admin.register(Base)
class BaseAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(AssetType)
class AssetTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = ('id', 'base', 'asset_type', 'quantity', 'date', 'created_by')
    list_filter = ('date', 'base', 'asset_type')
    date_hierarchy = 'date'

@admin.register(Transfer)
class TransferAdmin(admin.ModelAdmin):
    list_display = ('id', 'from_base', 'to_base', 'asset_type', 'quantity', 'date', 'created_by')
    list_filter = ('date', 'from_base', 'to_base', 'asset_type')
    date_hierarchy = 'date'

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'personnel_name', 'base', 'asset_type', 'quantity', 'date', 'created_by')
    list_filter = ('date', 'base', 'asset_type')
    search_fields = ('personnel_name',)

@admin.register(Expenditure)
class ExpenditureAdmin(admin.ModelAdmin):
    list_display = ('id', 'base', 'asset_type', 'quantity', 'date', 'reason', 'created_by')
    list_filter = ('date', 'base', 'asset_type')
    search_fields = ('reason',)

@admin.register(TransactionLog)
class TransactionLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'action', 'user', 'timestamp')
    list_filter = ('action', 'timestamp')
    readonly_fields = ('timestamp',)