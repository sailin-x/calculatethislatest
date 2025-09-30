export interface podcast_sponsorship_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface podcast_sponsorship_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface podcast_sponsorship_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface podcast_sponsorship_calculatorOutputs {
  result: number;
  analysis: podcast_sponsorship_calculatorAnalysis;
}
