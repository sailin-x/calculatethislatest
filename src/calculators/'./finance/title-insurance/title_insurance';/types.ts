export interface './finance/title-insurance/title_insurance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/title-insurance/title_insurance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/title-insurance/title_insurance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/title-insurance/title_insurance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
