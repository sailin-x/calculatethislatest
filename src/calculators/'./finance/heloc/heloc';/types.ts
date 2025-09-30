export interface './finance/heloc/heloc';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/heloc/heloc';Results {
  result: number;
  analysis?: string;
}

export interface './finance/heloc/heloc';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/heloc/heloc';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
