export interface portfolio_company_ebitda_growth_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface portfolio_company_ebitda_growth_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface portfolio_company_ebitda_growth_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface portfolio_company_ebitda_growth_calculatorOutputs {
  result: number;
  analysis: portfolio_company_ebitda_growth_calculatorAnalysis;
}
