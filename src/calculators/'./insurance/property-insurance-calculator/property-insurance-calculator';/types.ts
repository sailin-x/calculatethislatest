export interface './insurance/property-insurance-calculator/property-insurance-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/property-insurance-calculator/property-insurance-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/property-insurance-calculator/property-insurance-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/property-insurance-calculator/property-insurance-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
