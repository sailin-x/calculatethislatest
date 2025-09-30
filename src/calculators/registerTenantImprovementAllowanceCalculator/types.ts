export interface registerTenantImprovementAllowanceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerTenantImprovementAllowanceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerTenantImprovementAllowanceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerTenantImprovementAllowanceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
