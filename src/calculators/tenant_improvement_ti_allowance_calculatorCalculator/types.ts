export interface tenant_improvement_ti_allowance_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface tenant_improvement_ti_allowance_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface tenant_improvement_ti_allowance_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface tenant_improvement_ti_allowance_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
