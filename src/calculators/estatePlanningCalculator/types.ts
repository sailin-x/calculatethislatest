export interface estatePlanningCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface estatePlanningCalculatorResults {
  result: number;
  analysis?: string;
}

export interface estatePlanningCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface estatePlanningCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
