export interface estate_planning_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface estate_planning_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface estate_planning_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface estate_planning_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
