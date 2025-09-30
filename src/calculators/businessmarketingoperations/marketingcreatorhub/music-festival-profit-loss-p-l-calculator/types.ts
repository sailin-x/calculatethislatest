export interface music_festival_profit_loss_p_l_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface music_festival_profit_loss_p_l_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface music_festival_profit_loss_p_l_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface music_festival_profit_loss_p_l_calculatorOutputs {
  result: number;
  analysis: music_festival_profit_loss_p_l_calculatorAnalysis;
}
