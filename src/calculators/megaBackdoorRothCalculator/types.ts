export interface megaBackdoorRothCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface megaBackdoorRothCalculatorResults {
  result: number;
  analysis?: string;
}

export interface megaBackdoorRothCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface megaBackdoorRothCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
