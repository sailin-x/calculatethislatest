export interface aiops-implementation-savings-calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface aiops-implementation-savings-calculatorResults {
  result: number;
  analysis?: string;
}

export interface aiops-implementation-savings-calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface aiops-implementation-savings-calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
