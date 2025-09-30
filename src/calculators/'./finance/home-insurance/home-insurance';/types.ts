export interface './finance/home-insurance/home-insurance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/home-insurance/home-insurance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/home-insurance/home-insurance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/home-insurance/home-insurance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
