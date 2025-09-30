export interface './financeinvestment/retirementsavingshub/sep-ira-calculator/sep-ira-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/retirementsavingshub/sep-ira-calculator/sep-ira-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/retirementsavingshub/sep-ira-calculator/sep-ira-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/retirementsavingshub/sep-ira-calculator/sep-ira-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
