export interface 401kCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface 401kCalculatorResults {
  result: number;
  analysis?: string;
}

export interface 401kCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface 401kCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
