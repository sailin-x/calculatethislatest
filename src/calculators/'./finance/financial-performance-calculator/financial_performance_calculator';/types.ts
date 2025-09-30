export interface './finance/financial-performance-calculator/financial_performance_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/financial-performance-calculator/financial_performance_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/financial-performance-calculator/financial_performance_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/financial-performance-calculator/financial_performance_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
