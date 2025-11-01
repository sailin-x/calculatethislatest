export interface 529_college_savings_planCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface 529_college_savings_planCalculatorResults {
  result: number;
  analysis?: string;
}

export interface 529_college_savings_planCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface 529_college_savings_planCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
