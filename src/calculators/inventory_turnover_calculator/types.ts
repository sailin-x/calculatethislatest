export interface inventory_turnover_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface inventory_turnover_calculatorResults {
  result: number;
  analysis?: string;
}

export interface inventory_turnover_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface inventory_turnover_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
