export interface './finance/property-tax-proration/property-tax-proration';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/property-tax-proration/property-tax-proration';Results {
  result: number;
  analysis?: string;
}

export interface './finance/property-tax-proration/property-tax-proration';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/property-tax-proration/property-tax-proration';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
