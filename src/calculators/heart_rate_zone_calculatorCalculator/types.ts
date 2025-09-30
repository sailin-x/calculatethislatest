export interface heart_rate_zone_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface heart_rate_zone_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface heart_rate_zone_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface heart_rate_zone_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
