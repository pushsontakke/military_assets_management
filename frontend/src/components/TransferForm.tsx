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
} from "@mui/material";
import { api } from "../api/client";
import { Base, AssetType } from "../types/index";

interface TransferFormProps {
  onSuccess: () => void;
}

const TransferForm: React.FC<TransferFormProps> = ({ onSuccess }) => {
  const [bases, setBases] = useState<Base[]>([]);
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [formData, setFormData] = useState({
    from_base: "",
    to_base: "",
    asset_type: "",
    quantity: "",
    date: new Date().toISOString().split("T")[0],
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
    if (
      !formData.from_base ||
      !formData.to_base ||
      !formData.asset_type ||
      !formData.quantity
    ) {
      setError("All fields are required");
      return;
    }
    if (formData.from_base === formData.to_base) {
      setError("From and To base cannot be the same");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await api.post("/transfers/", {
        from_base: formData.from_base,
        to_base: formData.to_base,
        asset_type: formData.asset_type,
        quantity: Number(formData.quantity),
        date: formData.date,
      });
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to create transfer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mb: 4, p: 3, border: "1px solid #eee", borderRadius: 2 }}
    >
      <h3>Create Asset Transfer</h3>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>From Base</InputLabel>
        <Select
          name="from_base"
          value={formData.from_base}
          onChange={handleChange}
          label="From Base"
        >
          {bases.map((b) => (
            <MenuItem key={b.id} value={b.id}>
              {b.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>To Base</InputLabel>
        <Select
          name="to_base"
          value={formData.to_base}
          onChange={handleChange}
          label="To Base"
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
        {loading ? "Transferring..." : "Create Transfer"}
      </Button>
    </Box>
  );
};

export default TransferForm;
