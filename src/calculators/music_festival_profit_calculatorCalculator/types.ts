export interface music_festival_profit_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface music_festival_profit_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface music_festival_profit_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface music_festival_profit_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
