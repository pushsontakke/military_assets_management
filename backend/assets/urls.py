from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PurchaseViewSet, TransferViewSet, AssignmentViewSet, ExpenditureViewSet,
    BaseViewSet, AssetTypeViewSet, dashboard_metrics
)

router = DefaultRouter()
router.register(r'purchases', PurchaseViewSet)
router.register(r'transfers', TransferViewSet)
router.register(r'assignments', AssignmentViewSet)
router.register(r'expenditures', ExpenditureViewSet)
router.register(r'bases', BaseViewSet)
router.register(r'asset-types', AssetTypeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', dashboard_metrics, name='dashboard'),
]