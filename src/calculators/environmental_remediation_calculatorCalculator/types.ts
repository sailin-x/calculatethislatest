export interface environmental_remediation_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface environmental_remediation_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface environmental_remediation_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface environmental_remediation_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
