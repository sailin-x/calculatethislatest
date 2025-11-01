export interface estate_planning_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface estate_planning_calculatorResults {
  result: number;
  analysis?: string;
}

export interface estate_planning_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface estate_planning_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
