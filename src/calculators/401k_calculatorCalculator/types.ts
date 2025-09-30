export interface Four01kCalculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface Four01kCalculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface Four01kCalculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface Four01kCalculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
