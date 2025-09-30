export interface './finance/property-tax-proration/property_tax_proration';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/property-tax-proration/property_tax_proration';Results {
  result: number;
  analysis?: string;
}

export interface './finance/property-tax-proration/property_tax_proration';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/property-tax-proration/property_tax_proration';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
