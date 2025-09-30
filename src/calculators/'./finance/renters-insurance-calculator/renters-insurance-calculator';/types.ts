export interface './finance/renters-insurance-calculator/renters-insurance-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/renters-insurance-calculator/renters-insurance-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/renters-insurance-calculator/renters-insurance-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/renters-insurance-calculator/renters-insurance-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
