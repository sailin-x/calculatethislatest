export interface './business/music-festival-profit-loss-calculator/music_festival_profit_loss_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/music-festival-profit-loss-calculator/music_festival_profit_loss_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/music-festival-profit-loss-calculator/music_festival_profit_loss_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/music-festival-profit-loss-calculator/music_festival_profit_loss_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
