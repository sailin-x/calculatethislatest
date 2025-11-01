export interface dialysis_center_profitability_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface dialysis_center_profitability_calculatorResults {
  result: number;
  analysis?: string;
}

export interface dialysis_center_profitability_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface dialysis_center_profitability_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
