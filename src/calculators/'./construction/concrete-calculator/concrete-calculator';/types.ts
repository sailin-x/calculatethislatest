export interface './construction/concrete-calculator/concrete-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './construction/concrete-calculator/concrete-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './construction/concrete-calculator/concrete-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './construction/concrete-calculator/concrete-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
