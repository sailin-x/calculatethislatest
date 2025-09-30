export interface './finance/529-college-savings-plan/529-college-savings-plan';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/529-college-savings-plan/529-college-savings-plan';Results {
  result: number;
  analysis?: string;
}

export interface './finance/529-college-savings-plan/529-college-savings-plan';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/529-college-savings-plan/529-college-savings-plan';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
