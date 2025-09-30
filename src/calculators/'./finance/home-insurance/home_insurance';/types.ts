export interface './finance/home-insurance/home_insurance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/home-insurance/home_insurance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/home-insurance/home_insurance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/home-insurance/home_insurance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
