export interface sales_commission_structure_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface sales_commission_structure_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface sales_commission_structure_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface sales_commission_structure_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
