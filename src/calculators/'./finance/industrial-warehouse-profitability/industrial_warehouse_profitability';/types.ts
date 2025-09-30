export interface './finance/industrial-warehouse-profitability/industrial_warehouse_profitability';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/industrial-warehouse-profitability/industrial_warehouse_profitability';Results {
  result: number;
  analysis?: string;
}

export interface './finance/industrial-warehouse-profitability/industrial_warehouse_profitability';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/industrial-warehouse-profitability/industrial_warehouse_profitability';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
