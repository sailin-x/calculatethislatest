export interface hsa_triple_tax_advantage_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hsa_triple_tax_advantage_calculatorResults {
  result: number;
  analysis?: string;
}

export interface hsa_triple_tax_advantage_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hsa_triple_tax_advantage_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
