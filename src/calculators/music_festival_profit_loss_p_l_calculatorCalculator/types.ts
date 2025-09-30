export interface music_festival_profit_loss_p_l_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface music_festival_profit_loss_p_l_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface music_festival_profit_loss_p_l_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface music_festival_profit_loss_p_l_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
