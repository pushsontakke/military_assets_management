from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum, Q
from .models import Purchase, Transfer, Assignment, Expenditure, Base, AssetType

from .serializers import (
    PurchaseSerializer, TransferSerializer,
    AssignmentSerializer, ExpenditureSerializer,
    BaseSerializer, AssetTypeSerializer
)


class PurchaseViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    filterset_fields = ['date', 'base', 'asset_type']


class TransferViewSet(viewsets.ModelViewSet):
    queryset = Transfer.objects.all()
    serializer_class = TransferSerializer
    filterset_fields = ['date', 'from_base', 'to_base', 'asset_type']


class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    filterset_fields = ['date', 'base', 'asset_type']


class ExpenditureViewSet(viewsets.ModelViewSet):
    queryset = Expenditure.objects.all()
    serializer_class = ExpenditureSerializer
    filterset_fields = ['date', 'base', 'asset_type']


class BaseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Base.objects.all()
    serializer_class = BaseSerializer


class AssetTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AssetType.objects.all()
    serializer_class = AssetTypeSerializer


@api_view(['GET'])
def dashboard_metrics(request):
    base_id = request.GET.get('base')
    asset_type_id = request.GET.get('asset_type')
    date_from = request.GET.get('date_from')
    date_to = request.GET.get('date_to')

    filters = {}
    if base_id: filters['base_id'] = base_id
    if asset_type_id: filters['asset_type_id'] = asset_type_id
    if date_from: filters['date__gte'] = date_from
    if date_to: filters['date__lte'] = date_to

    purchases = Purchase.objects.filter(**filters).aggregate(total=Sum('quantity'))['total'] or 0
    transfers_in = Transfer.objects.filter(to_base_id=base_id, **{k: v for k, v in filters.items() if k != 'base_id'}).aggregate(total=Sum('quantity'))['total'] or 0
    transfers_out = Transfer.objects.filter(from_base_id=base_id, **{k: v for k, v in filters.items() if k != 'base_id'}).aggregate(total=Sum('quantity'))['total'] or 0
    assignments = Assignment.objects.filter(**filters).aggregate(total=Sum('quantity'))['total'] or 0
    expenditures = Expenditure.objects.filter(**filters).aggregate(total=Sum('quantity'))['total'] or 0

    net_movement = purchases + transfers_in - transfers_out
    closing_balance = net_movement - assignments - expenditures  # assuming opening = 0 for simplicity

    return Response({
        'opening_balance': 0,
        'closing_balance': closing_balance,
        'net_movement': net_movement,
        'assigned': assignments,
        'expended': expenditures,
    })