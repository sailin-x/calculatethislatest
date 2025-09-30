export interface './finance/rental-property-roi/rental-property-roi';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/rental-property-roi/rental-property-roi';Results {
  result: number;
  analysis?: string;
}

export interface './finance/rental-property-roi/rental-property-roi';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/rental-property-roi/rental-property-roi';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
