export interface './finance/commodity-calculator/commodity-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/commodity-calculator/commodity-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/commodity-calculator/commodity-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/commodity-calculator/commodity-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
