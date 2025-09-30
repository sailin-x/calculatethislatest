export interface './finance/corporate-bond-calculator/corporate-bond-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/corporate-bond-calculator/corporate-bond-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/corporate-bond-calculator/corporate-bond-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/corporate-bond-calculator/corporate-bond-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
