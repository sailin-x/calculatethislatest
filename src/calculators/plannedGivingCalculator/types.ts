export interface plannedGivingCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface plannedGivingCalculatorResults {
  result: number;
  analysis?: string;
}

export interface plannedGivingCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface plannedGivingCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
