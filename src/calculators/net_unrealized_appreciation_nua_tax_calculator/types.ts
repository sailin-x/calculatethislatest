export interface net_unrealized_appreciation_nua_tax_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface net_unrealized_appreciation_nua_tax_calculatorResults {
  result: number;
  analysis?: string;
}

export interface net_unrealized_appreciation_nua_tax_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface net_unrealized_appreciation_nua_tax_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
