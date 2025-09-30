export interface customer_lifetime_valueCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface customer_lifetime_valueCalculatorResults {
  result: number;
  analysis?: string;
}

export interface customer_lifetime_valueCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface customer_lifetime_valueCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
