export interface executiveDeferredCompensationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface executiveDeferredCompensationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface executiveDeferredCompensationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface executiveDeferredCompensationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
