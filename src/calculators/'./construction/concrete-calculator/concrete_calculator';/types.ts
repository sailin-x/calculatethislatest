export interface './construction/concrete-calculator/concrete_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './construction/concrete-calculator/concrete_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './construction/concrete-calculator/concrete_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './construction/concrete-calculator/concrete_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
