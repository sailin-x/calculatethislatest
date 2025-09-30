export interface crowdfunding_equity_offering_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface crowdfunding_equity_offering_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface crowdfunding_equity_offering_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface crowdfunding_equity_offering_calculatorOutputs {
  result: number;
  analysis: crowdfunding_equity_offering_calculatorAnalysis;
}
