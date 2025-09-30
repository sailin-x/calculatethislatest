export interface './business/music-festival-profit-calculator/music_festival_profit_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/music-festival-profit-calculator/music_festival_profit_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/music-festival-profit-calculator/music_festival_profit_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/music-festival-profit-calculator/music_festival_profit_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
