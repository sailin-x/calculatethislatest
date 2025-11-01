export interface antitrust_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface antitrust_calculatorResults {
  result: number;
  analysis?: string;
}

export interface antitrust_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface antitrust_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
