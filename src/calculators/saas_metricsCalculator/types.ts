export interface saas_metricsCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface saas_metricsCalculatorResults {
  result: number;
  analysis?: string;
}

export interface saas_metricsCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface saas_metricsCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
