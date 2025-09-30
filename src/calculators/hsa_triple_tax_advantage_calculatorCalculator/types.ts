export interface hsa_triple_tax_advantage_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hsa_triple_tax_advantage_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface hsa_triple_tax_advantage_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hsa_triple_tax_advantage_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
