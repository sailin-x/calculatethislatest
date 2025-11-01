export interface copyright_infringement_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface copyright_infringement_calculatorResults {
  result: number;
  analysis?: string;
}

export interface copyright_infringement_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface copyright_infringement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
