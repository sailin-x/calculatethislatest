export interface registerExecutiveDeferredCompensationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerExecutiveDeferredCompensationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerExecutiveDeferredCompensationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerExecutiveDeferredCompensationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
