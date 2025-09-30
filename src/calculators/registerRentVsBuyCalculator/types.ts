export interface registerRentVsBuyCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerRentVsBuyCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerRentVsBuyCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerRentVsBuyCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
