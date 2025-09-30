export interface './finance/defined-benefit-plan/defined_benefit_plan';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/defined-benefit-plan/defined_benefit_plan';Results {
  result: number;
  analysis?: string;
}

export interface './finance/defined-benefit-plan/defined_benefit_plan';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/defined-benefit-plan/defined_benefit_plan';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
