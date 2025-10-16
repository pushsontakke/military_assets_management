export interface Base {
  id: number;
  name: string;
}
export interface AssetType {
  id: number;
  name: string;
}

export interface Purchase {
  id: number;
  base: number;
  base_name?: string;
  asset_type: number;
  asset_type_name?: string;
  quantity: number;
  date: string;
}

export interface Transfer {
  id: number;
  from_base: number;
  from_base_name?: string;
  to_base: number;
  to_base_name?: string;
  asset_type: number;
  asset_type_name?: string;
  quantity: number;
  date: string;
}

export interface Assignment {
  id: number;
  personnel_name: string;
  base: number;
  base_name?: string;
  asset_type: number;
  asset_type_name?: string;
  quantity: number;
  date: string;
}

export interface Expenditure {
  id: number;
  base: number;
  base_name?: string;
  asset_type: number;
  asset_type_name?: string;
  quantity: number;
  date: string;
  reason: string;
}

export interface DashboardMetrics {
  opening_balance: number;
  closing_balance: number;
  net_movement: number;
  assigned: number;
  expended: number;
}
