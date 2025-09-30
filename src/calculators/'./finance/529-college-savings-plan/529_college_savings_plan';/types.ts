export interface './finance/529-college-savings-plan/529_college_savings_plan';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/529-college-savings-plan/529_college_savings_plan';Results {
  result: number;
  analysis?: string;
}

export interface './finance/529-college-savings-plan/529_college_savings_plan';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/529-college-savings-plan/529_college_savings_plan';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
