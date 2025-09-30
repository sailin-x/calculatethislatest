export interface concreteCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface concreteCalculatorResults {
  result: number;
  analysis?: string;
}

export interface concreteCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface concreteCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
