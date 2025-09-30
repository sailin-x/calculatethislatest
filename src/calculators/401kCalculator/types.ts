export interface Four01kCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface Four01kCalculatorResults {
  result: number;
  analysis?: string;
}

export interface Four01kCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface Four01kCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
