export interface tenant_improvementCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface tenant_improvementCalculatorResults {
  result: number;
  analysis?: string;
}

export interface tenant_improvementCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface tenant_improvementCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
