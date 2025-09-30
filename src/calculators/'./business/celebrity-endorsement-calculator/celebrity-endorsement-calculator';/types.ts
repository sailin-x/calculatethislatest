export interface './business/celebrity-endorsement-calculator/celebrity-endorsement-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/celebrity-endorsement-calculator/celebrity-endorsement-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/celebrity-endorsement-calculator/celebrity-endorsement-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/celebrity-endorsement-calculator/celebrity-endorsement-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
