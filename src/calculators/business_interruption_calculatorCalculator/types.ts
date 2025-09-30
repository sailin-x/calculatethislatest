export interface business_interruption_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface business_interruption_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface business_interruption_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface business_interruption_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
