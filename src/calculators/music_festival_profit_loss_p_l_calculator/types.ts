export interface music_festival_profit_loss_p_l_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface music_festival_profit_loss_p_l_calculatorResults {
  result: number;
  analysis?: string;
}

export interface music_festival_profit_loss_p_l_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface music_festival_profit_loss_p_l_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
