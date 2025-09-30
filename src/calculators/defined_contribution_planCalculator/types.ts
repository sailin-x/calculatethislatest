export interface defined_contribution_planCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface defined_contribution_planCalculatorResults {
  result: number;
  analysis?: string;
}

export interface defined_contribution_planCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface defined_contribution_planCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
