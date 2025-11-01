export interface bmi_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface bmi_calculatorResults {
  result: number;
  analysis?: string;
}

export interface bmi_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface bmi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
