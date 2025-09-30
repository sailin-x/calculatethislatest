export interface registerEstatePlanningCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerEstatePlanningCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerEstatePlanningCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerEstatePlanningCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
