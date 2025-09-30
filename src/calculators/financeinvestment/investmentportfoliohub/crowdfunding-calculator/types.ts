export interface crowdfunding_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface crowdfunding_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface crowdfunding_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface crowdfunding_calculatorOutputs {
  result: number;
  analysis: crowdfunding_calculatorAnalysis;
}
