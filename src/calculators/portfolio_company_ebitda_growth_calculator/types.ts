export interface portfolio_company_ebitda_growth_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface portfolio_company_ebitda_growth_calculatorResults {
  result: number;
  analysis?: string;
}

export interface portfolio_company_ebitda_growth_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface portfolio_company_ebitda_growth_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
