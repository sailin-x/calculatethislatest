export interface spinal_cord_injury_compensation_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface spinal_cord_injury_compensation_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface spinal_cord_injury_compensation_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface spinal_cord_injury_compensation_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
