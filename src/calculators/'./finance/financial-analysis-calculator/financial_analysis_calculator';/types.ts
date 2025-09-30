export interface './finance/financial-analysis-calculator/financial_analysis_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/financial-analysis-calculator/financial_analysis_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/financial-analysis-calculator/financial_analysis_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/financial-analysis-calculator/financial_analysis_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
