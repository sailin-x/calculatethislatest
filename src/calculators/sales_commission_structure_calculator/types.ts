export interface sales_commission_structure_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface sales_commission_structure_calculatorResults {
  result: number;
  analysis?: string;
}

export interface sales_commission_structure_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface sales_commission_structure_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
