export interface './finance/401k-plan/401k-plan';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/401k-plan/401k-plan';Results {
  result: number;
  analysis?: string;
}

export interface './finance/401k-plan/401k-plan';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/401k-plan/401k-plan';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
