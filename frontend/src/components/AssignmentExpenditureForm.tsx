import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Tabs,
  Tab,
} from "@mui/material";
import { api } from "../api/client";
import { Base, AssetType } from "../types/index";

interface AssignmentExpenditureFormProps {
  onSuccess: () => void;
}

const AssignmentExpenditureForm: React.FC<AssignmentExpenditureFormProps> = ({
  onSuccess,
}) => {
  const [tab, setTab] = useState<"assignment" | "expenditure">("assignment");
  const [bases, setBases] = useState<Base[]>([]);
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [formData, setFormData] = useState({
    // Assignment
    personnel_name: "",
    // Shared
    base: "",
    asset_type: "",
    quantity: "",
    date: new Date().toISOString().split("T")[0],
    // Expenditure
    reason: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [basesRes, typesRes] = await Promise.all([
          api.get<Base[]>("/bases/"),
          api.get<AssetType[]>("/asset-types/"),
        ]);
        setBases(basesRes.data);
        setAssetTypes(typesRes.data);
      } catch (err) {
        setError("Failed to load data");
      }
    };
    fetchData();
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.base || !formData.asset_type || !formData.quantity) {
      setError("Base, Asset Type, and Quantity are required");
      return;
    }

    if (tab === "assignment" && !formData.personnel_name) {
      setError("Personnel name is required for assignment");
      return;
    }

    setLoading(true);
    setError("");
    try {
      if (tab === "assignment") {
        await api.post("/assignments/", {
          personnel_name: formData.personnel_name,
          base: formData.base,
          asset_type: formData.asset_type,
          quantity: Number(formData.quantity),
          date: formData.date,
        });
      } else {
        await api.post("/expenditures/", {
          base: formData.base,
          asset_type: formData.asset_type,
          quantity: Number(formData.quantity),
          date: formData.date,
          reason: formData.reason,
        });
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mb: 4, p: 3, border: "1px solid #eee", borderRadius: 2 }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Assign Asset" value="assignment" />
        <Tab label="Record Expenditure" value="expenditure" />
      </Tabs>

      <Box component="form" onSubmit={handleSubmit}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {tab === "assignment" && (
          <TextField
            label="Personnel Name"
            name="personnel_name"
            value={formData.personnel_name}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
        )}

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Base</InputLabel>
          <Select
            name="base"
            value={formData.base}
            onChange={handleChange}
            label="Base"
          >
            {bases.map((b) => (
              <MenuItem key={b.id} value={b.id}>
                {b.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Asset Type</InputLabel>
          <Select
            name="asset_type"
            value={formData.asset_type}
            onChange={handleChange}
            label="Asset Type"
          >
            {assetTypes.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Quantity"
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          inputProps={{ min: 1 }}
        />

        {tab === "expenditure" && (
          <TextField
            label="Reason (Optional)"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            multiline
            rows={2}
          />
        )}

        <TextField
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" disabled={loading}>
          {loading
            ? "Saving..."
            : tab === "assignment"
            ? "Assign Asset"
            : "Record Expenditure"}
        </Button>
      </Box>
    </Box>
  );
};

export default AssignmentExpenditureForm;
