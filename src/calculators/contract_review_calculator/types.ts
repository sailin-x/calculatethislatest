export interface contract_review_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface contract_review_calculatorResults {
  result: number;
  analysis?: string;
}

export interface contract_review_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface contract_review_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
