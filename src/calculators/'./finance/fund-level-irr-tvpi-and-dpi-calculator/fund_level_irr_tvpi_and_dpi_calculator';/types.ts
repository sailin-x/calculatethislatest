export interface './finance/fund-level-irr-tvpi-and-dpi-calculator/fund_level_irr_tvpi_and_dpi_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/fund-level-irr-tvpi-and-dpi-calculator/fund_level_irr_tvpi_and_dpi_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/fund-level-irr-tvpi-and-dpi-calculator/fund_level_irr_tvpi_and_dpi_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/fund-level-irr-tvpi-and-dpi-calculator/fund_level_irr_tvpi_and_dpi_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
