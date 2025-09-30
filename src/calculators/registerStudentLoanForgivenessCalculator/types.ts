export interface registerStudentLoanForgivenessCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerStudentLoanForgivenessCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerStudentLoanForgivenessCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerStudentLoanForgivenessCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
