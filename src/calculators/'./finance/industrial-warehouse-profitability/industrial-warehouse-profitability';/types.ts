export interface './finance/industrial-warehouse-profitability/industrial-warehouse-profitability';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/industrial-warehouse-profitability/industrial-warehouse-profitability';Results {
  result: number;
  analysis?: string;
}

export interface './finance/industrial-warehouse-profitability/industrial-warehouse-profitability';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/industrial-warehouse-profitability/industrial-warehouse-profitability';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
