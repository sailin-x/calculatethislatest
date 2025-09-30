export interface churn_rate_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface churn_rate_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface churn_rate_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface churn_rate_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
