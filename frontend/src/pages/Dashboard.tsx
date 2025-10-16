import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import { api } from "../api/client";
import { Base, AssetType, DashboardMetrics } from "../types/index";

const Dashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [bases, setBases] = useState<Base[]>([]);
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [filters, setFilters] = useState({
    base: "",
    asset_type: "",
    date_from: "",
    date_to: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [basesRes, typesRes, metricsRes] = await Promise.all([
          api.get<Base[]>("/bases/"),
          api.get<AssetType[]>("/asset-types/"),
          api.get<DashboardMetrics>("/dashboard/", { params: filters }),
        ]);
        setBases(basesRes.data);
        setAssetTypes(typesRes.data);
        setMetrics(metricsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, [filters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Military Asset Dashboard
      </Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={3}>
          <TextField
            select
            label="Base"
            name="base"
            value={filters.base}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="">All Bases</MenuItem>
            {bases.map((b) => (
              <MenuItem key={b.id} value={b.id}>
                {b.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            select
            label="Asset Type"
            name="asset_type"
            value={filters.asset_type}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="">All Types</MenuItem>
            {assetTypes.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            label="From Date"
            type="date"
            name="date_from"
            value={filters.date_from}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            label="To Date"
            type="date"
            name="date_to"
            value={filters.date_to}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
      </Grid>

      {metrics && (
        <Grid container spacing={3}>
          {(
            [
              "opening_balance",
              "closing_balance",
              "net_movement",
              "assigned",
              "expended",
            ] as const
          ).map((key) => (
            <Grid item xs={12} sm={6} md={2.4} key={key}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {key
                      .replace("_", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Typography>
                  <Typography variant="h5">{metrics[key]}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
