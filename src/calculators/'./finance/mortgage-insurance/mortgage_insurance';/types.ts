export interface './finance/mortgage-insurance/mortgage_insurance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mortgage-insurance/mortgage_insurance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mortgage-insurance/mortgage_insurance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mortgage-insurance/mortgage_insurance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
