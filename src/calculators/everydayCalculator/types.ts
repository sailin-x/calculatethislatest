export interface everydayCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface everydayCalculatorResults {
  result: number;
  analysis?: string;
}

export interface everydayCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface everydayCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
