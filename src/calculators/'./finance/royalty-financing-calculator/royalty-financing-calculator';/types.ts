export interface './finance/royalty-financing-calculator/royalty-financing-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/royalty-financing-calculator/royalty-financing-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/royalty-financing-calculator/royalty-financing-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/royalty-financing-calculator/royalty-financing-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
