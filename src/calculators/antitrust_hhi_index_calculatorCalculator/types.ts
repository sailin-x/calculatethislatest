export interface antitrust_hhi_index_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface antitrust_hhi_index_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface antitrust_hhi_index_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface antitrust_hhi_index_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
