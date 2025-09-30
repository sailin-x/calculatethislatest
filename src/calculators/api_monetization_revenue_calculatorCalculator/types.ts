export interface api_monetization_revenue_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface api_monetization_revenue_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface api_monetization_revenue_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface api_monetization_revenue_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
