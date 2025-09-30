export interface inheritance_tax_estimatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface inheritance_tax_estimatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface inheritance_tax_estimatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface inheritance_tax_estimatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
