export interface './health/pressure-washing-cost-calculator/pressure-washing-cost-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/pressure-washing-cost-calculator/pressure-washing-cost-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/pressure-washing-cost-calculator/pressure-washing-cost-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/pressure-washing-cost-calculator/pressure-washing-cost-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
