export interface actuarial_mortality_table_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface actuarial_mortality_table_calculatorResults {
  result: number;
  analysis?: string;
}

export interface actuarial_mortality_table_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface actuarial_mortality_table_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
