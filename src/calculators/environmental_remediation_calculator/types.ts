export interface environmental_remediation_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface environmental_remediation_calculatorResults {
  result: number;
  analysis?: string;
}

export interface environmental_remediation_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface environmental_remediation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
