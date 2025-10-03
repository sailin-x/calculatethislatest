export interface K401PlanCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface K401PlanCalculatorResults {
  result: number;
  analysis?: string;
}

export interface K401PlanCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface K401PlanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
