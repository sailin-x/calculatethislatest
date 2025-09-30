export interface './finance/mortgage-qualification/mortgage-qualification';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mortgage-qualification/mortgage-qualification';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mortgage-qualification/mortgage-qualification';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mortgage-qualification/mortgage-qualification';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
