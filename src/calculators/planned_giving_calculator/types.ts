export interface planned_giving_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface planned_giving_calculatorResults {
  result: number;
  analysis?: string;
}

export interface planned_giving_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface planned_giving_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
