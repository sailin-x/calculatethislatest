export interface registerPlannedGivingCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerPlannedGivingCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerPlannedGivingCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerPlannedGivingCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
