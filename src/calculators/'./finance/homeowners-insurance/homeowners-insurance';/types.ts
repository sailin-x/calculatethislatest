export interface './finance/homeowners-insurance/homeowners-insurance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/homeowners-insurance/homeowners-insurance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/homeowners-insurance/homeowners-insurance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/homeowners-insurance/homeowners-insurance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
