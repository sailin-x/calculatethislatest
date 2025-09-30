export interface './finance/timberland-investment/timberland_investment';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/timberland-investment/timberland_investment';Results {
  result: number;
  analysis?: string;
}

export interface './finance/timberland-investment/timberland_investment';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/timberland-investment/timberland_investment';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
