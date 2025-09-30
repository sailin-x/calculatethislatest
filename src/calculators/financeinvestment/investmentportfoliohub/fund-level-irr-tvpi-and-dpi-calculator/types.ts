export interface fund_level_irr_tvpi_and_dpi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface fund_level_irr_tvpi_and_dpi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface fund_level_irr_tvpi_and_dpi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface fund_level_irr_tvpi_and_dpi_calculatorOutputs {
  result: number;
  analysis: fund_level_irr_tvpi_and_dpi_calculatorAnalysis;
}
