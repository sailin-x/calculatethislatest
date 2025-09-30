export interface capital_call_schedule_plannerCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface capital_call_schedule_plannerCalculatorResults {
  result: number;
  analysis?: string;
}

export interface capital_call_schedule_plannerCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface capital_call_schedule_plannerCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
