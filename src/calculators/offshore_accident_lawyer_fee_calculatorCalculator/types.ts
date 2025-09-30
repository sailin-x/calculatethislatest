export interface offshore_accident_lawyer_fee_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface offshore_accident_lawyer_fee_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface offshore_accident_lawyer_fee_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface offshore_accident_lawyer_fee_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
