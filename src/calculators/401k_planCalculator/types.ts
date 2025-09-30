export interface 401k_planCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface 401k_planCalculatorResults {
  result: number;
  analysis?: string;
}

export interface 401k_planCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface 401k_planCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
