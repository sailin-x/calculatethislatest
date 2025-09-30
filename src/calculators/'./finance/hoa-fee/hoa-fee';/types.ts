export interface './finance/hoa-fee/hoa-fee';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/hoa-fee/hoa-fee';Results {
  result: number;
  analysis?: string;
}

export interface './finance/hoa-fee/hoa-fee';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/hoa-fee/hoa-fee';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
