export interface music_festival_profit_loss_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface music_festival_profit_loss_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface music_festival_profit_loss_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface music_festival_profit_loss_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
