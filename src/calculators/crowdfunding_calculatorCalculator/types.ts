export interface crowdfunding_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface crowdfunding_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface crowdfunding_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface crowdfunding_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
