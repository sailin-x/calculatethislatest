export interface addiction_rehab_cost_financing_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface addiction_rehab_cost_financing_calculatorResults {
  result: number;
  analysis?: string;
}

export interface addiction_rehab_cost_financing_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface addiction_rehab_cost_financing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
