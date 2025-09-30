export interface title_insuranceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface title_insuranceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface title_insuranceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface title_insuranceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
