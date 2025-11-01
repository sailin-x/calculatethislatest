export interface manyvids_revenue_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface manyvids_revenue_calculatorResults {
  result: number;
  analysis?: string;
}

export interface manyvids_revenue_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface manyvids_revenue_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
