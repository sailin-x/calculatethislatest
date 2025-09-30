export interface registerCorporateBondCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerCorporateBondCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerCorporateBondCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerCorporateBondCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
