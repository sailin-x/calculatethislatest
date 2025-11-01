export interface invoice_financing_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface invoice_financing_calculatorResults {
  result: number;
  analysis?: string;
}

export interface invoice_financing_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface invoice_financing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
