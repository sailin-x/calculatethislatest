export interface './finance/private-mortgage-insurance/private-mortgage-insurance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/private-mortgage-insurance/private-mortgage-insurance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/private-mortgage-insurance/private-mortgage-insurance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/private-mortgage-insurance/private-mortgage-insurance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
