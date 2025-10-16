import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, MenuItem, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { api } from "../api/client";
import { Purchase, Base, AssetType } from "../types/index";
import PurchaseForm from "../components/PurchaseForm";

const Purchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [bases, setBases] = useState<Base[]>([]);
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [filters, setFilters] = useState({
    base: "",
    asset_type: "",
    date_from: "",
    date_to: "",
  });
  const [loading, setLoading] = useState(true);

  const loadPurchases = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (filters.base) params.base = filters.base;
      if (filters.asset_type) params.asset_type = filters.asset_type;
      if (filters.date_from) params.date__gte = filters.date_from;
      if (filters.date_to) params.date__lte = filters.date_to;

      const res = await api.get<Purchase[]>("/purchases/", { params });
      setPurchases(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [basesRes, typesRes] = await Promise.all([
          api.get<Base[]>("/bases/"),
          api.get<AssetType[]>("/asset-types/"),
        ]);
        setBases(basesRes.data);
        setAssetTypes(typesRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    loadPurchases();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "base_name", headerName: "Base", width: 150 },
    { field: "asset_type_name", headerName: "Asset Type", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "date", headerName: "Date", width: 120 },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Purchases
      </Typography>

      <PurchaseForm onSuccess={loadPurchases} />

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          select
          label="Base"
          name="base"
          value={filters.base}
          onChange={handleFilterChange}
          sx={{ mr: 2, minWidth: 150 }}
        >
          <MenuItem value="">All Bases</MenuItem>
          {bases.map((b) => (
            <MenuItem key={b.id} value={b.id}>
              {b.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Asset Type"
          name="asset_type"
          value={filters.asset_type}
          onChange={handleFilterChange}
          sx={{ mr: 2, minWidth: 150 }}
        >
          <MenuItem value="">All Types</MenuItem>
          {assetTypes.map((t) => (
            <MenuItem key={t.id} value={t.id}>
              {t.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="From"
          type="date"
          name="date_from"
          value={filters.date_from}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mr: 2 }}
        />

        <TextField
          label="To"
          type="date"
          name="date_to"
          value={filters.date_to}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
        />
      </Paper>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={purchases}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.id}
          pagination
          pageSizeOptions={[10, 25, 50]}
        />
      </div>
    </Box>
  );
};

export default Purchases;
