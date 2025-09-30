export interface film_slate_financing_roi_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface film_slate_financing_roi_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface film_slate_financing_roi_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface film_slate_financing_roi_calculatorOutputs {
  result: number;
  analysis: film_slate_financing_roi_calculatorAnalysis;
}
