export interface './insurance/earthquake-insurance-calculator/earthquake-insurance-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/earthquake-insurance-calculator/earthquake-insurance-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/earthquake-insurance-calculator/earthquake-insurance-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/earthquake-insurance-calculator/earthquake-insurance-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
