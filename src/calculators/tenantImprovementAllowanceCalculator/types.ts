export interface tenantImprovementAllowanceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface tenantImprovementAllowanceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface tenantImprovementAllowanceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface tenantImprovementAllowanceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
