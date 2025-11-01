export interface retirement_abroad_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface retirement_abroad_calculatorResults {
  result: number;
  analysis?: string;
}

export interface retirement_abroad_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface retirement_abroad_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
