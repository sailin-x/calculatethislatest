export interface music_catalogue_valuation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface music_catalogue_valuation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface music_catalogue_valuation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface music_catalogue_valuation_calculatorOutputs {
  result: number;
  analysis: music_catalogue_valuation_calculatorAnalysis;
}
