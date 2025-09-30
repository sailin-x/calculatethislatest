export interface 401k_company_match_roiCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface 401k_company_match_roiCalculatorResults {
  result: number;
  analysis?: string;
}

export interface 401k_company_match_roiCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface 401k_company_match_roiCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
