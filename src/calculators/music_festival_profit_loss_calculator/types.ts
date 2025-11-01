export interface music_festival_profit_loss_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface music_festival_profit_loss_calculatorResults {
  result: number;
  analysis?: string;
}

export interface music_festival_profit_loss_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface music_festival_profit_loss_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
