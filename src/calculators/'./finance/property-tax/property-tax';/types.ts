export interface './finance/property-tax/property-tax';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/property-tax/property-tax';Results {
  result: number;
  analysis?: string;
}

export interface './finance/property-tax/property-tax';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/property-tax/property-tax';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
