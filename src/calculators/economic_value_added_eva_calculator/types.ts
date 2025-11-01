export interface economic_value_added_eva_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface economic_value_added_eva_calculatorResults {
  result: number;
  analysis?: string;
}

export interface economic_value_added_eva_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface economic_value_added_eva_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
