export interface net_margin_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface net_margin_calculatorResults {
  result: number;
  analysis?: string;
}

export interface net_margin_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface net_margin_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
