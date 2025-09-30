export interface './legal/price-fixing-overcharge-calculator/price-fixing-overcharge-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/price-fixing-overcharge-calculator/price-fixing-overcharge-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/price-fixing-overcharge-calculator/price-fixing-overcharge-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/price-fixing-overcharge-calculator/price-fixing-overcharge-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
