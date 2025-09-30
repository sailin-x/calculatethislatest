export interface customer_acquisition_costCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface customer_acquisition_costCalculatorResults {
  result: number;
  analysis?: string;
}

export interface customer_acquisition_costCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface customer_acquisition_costCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
