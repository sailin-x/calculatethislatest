export interface tenant_improvement_ti_allowance_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface tenant_improvement_ti_allowance_calculatorResults {
  result: number;
  analysis?: string;
}

export interface tenant_improvement_ti_allowance_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface tenant_improvement_ti_allowance_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
