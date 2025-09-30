export interface './finance/property-tax-proration-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/property-tax-proration-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/property-tax-proration-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/property-tax-proration-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
