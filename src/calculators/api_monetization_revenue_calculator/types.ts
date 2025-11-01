export interface api_monetization_revenue_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface api_monetization_revenue_calculatorResults {
  result: number;
  analysis?: string;
}

export interface api_monetization_revenue_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface api_monetization_revenue_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
