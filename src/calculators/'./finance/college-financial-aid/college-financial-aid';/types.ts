export interface './finance/college-financial-aid/college-financial-aid';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/college-financial-aid/college-financial-aid';Results {
  result: number;
  analysis?: string;
}

export interface './finance/college-financial-aid/college-financial-aid';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/college-financial-aid/college-financial-aid';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
