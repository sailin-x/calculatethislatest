export interface defined_benefit_planCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface defined_benefit_planCalculatorResults {
  result: number;
  analysis?: string;
}

export interface defined_benefit_planCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface defined_benefit_planCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
