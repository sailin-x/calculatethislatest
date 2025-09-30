export interface StudentLoanForgivenessCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface StudentLoanForgivenessCalculatorResults {
  result: number;
  analysis?: string;
}

export interface StudentLoanForgivenessCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface StudentLoanForgivenessCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
