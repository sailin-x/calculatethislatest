export interface EverydayCalculatorInputs {
  calculationType: 'tip' | 'discount' | 'percentage' | 'ratio' | 'proportion' | 'interest' | 'loan' | 'budget' | 'split_bill' | 'unit_price';
  originalAmount: number;
  percentage: number;
  numberOfPeople: number;
  timePeriod: number;
  interestRate: number;
  principalAmount: number;
  additionalFees: number;
  taxRate: number;
}

export interface EverydayCalculatorMetrics {
  result: number;
  totalAmount: number;
  savings: number;
  perPersonAmount: number;
  effectiveRate: number;
  breakdown: Record<string, number>;
}

export interface EverydayCalculatorAnalysis {
  calculationType: string;
  fairness: string;
  recommendations: string[];
  alternatives: string[];
}

export interface EverydayCalculatorOutputs {
  result: number;
  totalAmount: number;
  breakdown: Record<string, number>;
  analysis: EverydayCalculatorAnalysis;
}
