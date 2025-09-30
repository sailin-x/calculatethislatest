export interface './finance/municipal-bond-calculator/municipal-bond-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/municipal-bond-calculator/municipal-bond-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/municipal-bond-calculator/municipal-bond-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/municipal-bond-calculator/municipal-bond-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
