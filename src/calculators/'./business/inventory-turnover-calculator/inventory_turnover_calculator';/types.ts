export interface './business/inventory-turnover-calculator/inventory_turnover_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/inventory-turnover-calculator/inventory_turnover_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/inventory-turnover-calculator/inventory_turnover_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/inventory-turnover-calculator/inventory_turnover_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
