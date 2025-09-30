export interface './finance/rental-property-roi/rental_property_roi';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/rental-property-roi/rental_property_roi';Results {
  result: number;
  analysis?: string;
}

export interface './finance/rental-property-roi/rental_property_roi';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/rental-property-roi/rental_property_roi';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
