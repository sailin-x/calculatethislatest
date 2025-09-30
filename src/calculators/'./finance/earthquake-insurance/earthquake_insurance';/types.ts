export interface './finance/earthquake-insurance/earthquake_insurance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/earthquake-insurance/earthquake_insurance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/earthquake-insurance/earthquake_insurance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/earthquake-insurance/earthquake_insurance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
