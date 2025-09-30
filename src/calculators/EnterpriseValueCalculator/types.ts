export interface EnterpriseValueCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface EnterpriseValueCalculatorResults {
  result: number;
  analysis?: string;
}

export interface EnterpriseValueCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface EnterpriseValueCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
