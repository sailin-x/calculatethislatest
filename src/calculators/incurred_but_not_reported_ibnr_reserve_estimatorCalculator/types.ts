export interface incurred_but_not_reported_ibnr_reserve_estimatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface incurred_but_not_reported_ibnr_reserve_estimatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface incurred_but_not_reported_ibnr_reserve_estimatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface incurred_but_not_reported_ibnr_reserve_estimatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
