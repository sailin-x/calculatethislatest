export interface './finance/arm-vs-fixed/arm-vs-fixed';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/arm-vs-fixed/arm-vs-fixed';Results {
  result: number;
  analysis?: string;
}

export interface './finance/arm-vs-fixed/arm-vs-fixed';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/arm-vs-fixed/arm-vs-fixed';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
