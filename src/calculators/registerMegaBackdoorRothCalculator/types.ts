export interface registerMegaBackdoorRothCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerMegaBackdoorRothCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerMegaBackdoorRothCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerMegaBackdoorRothCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
