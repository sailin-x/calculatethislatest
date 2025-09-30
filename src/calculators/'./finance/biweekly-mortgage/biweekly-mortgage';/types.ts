export interface './finance/biweekly-mortgage/biweekly-mortgage';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/biweekly-mortgage/biweekly-mortgage';Results {
  result: number;
  analysis?: string;
}

export interface './finance/biweekly-mortgage/biweekly-mortgage';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/biweekly-mortgage/biweekly-mortgage';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
