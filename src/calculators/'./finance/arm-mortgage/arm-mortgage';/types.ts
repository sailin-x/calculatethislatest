export interface './finance/arm-mortgage/arm-mortgage';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/arm-mortgage/arm-mortgage';Results {
  result: number;
  analysis?: string;
}

export interface './finance/arm-mortgage/arm-mortgage';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/arm-mortgage/arm-mortgage';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
