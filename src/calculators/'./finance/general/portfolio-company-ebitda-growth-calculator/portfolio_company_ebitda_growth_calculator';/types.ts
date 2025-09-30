export interface './finance/general/portfolio-company-ebitda-growth-calculator/portfolio_company_ebitda_growth_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/portfolio-company-ebitda-growth-calculator/portfolio_company_ebitda_growth_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/portfolio-company-ebitda-growth-calculator/portfolio_company_ebitda_growth_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/portfolio-company-ebitda-growth-calculator/portfolio_company_ebitda_growth_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
