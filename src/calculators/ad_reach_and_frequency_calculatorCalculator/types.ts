export interface ad_reach_and_frequency_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ad_reach_and_frequency_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface ad_reach_and_frequency_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ad_reach_and_frequency_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
