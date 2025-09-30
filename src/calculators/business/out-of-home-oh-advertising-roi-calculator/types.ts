export interface OutOfHomeOhAdvertisingRoiCalculatorInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface OutOfHomeOhAdvertisingRoiCalculatorMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface OutOfHomeOhAdvertisingRoiCalculatorAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface OutOfHomeOhAdvertisingRoiCalculatorOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: OutOfHomeOhAdvertisingRoiCalculatorAnalysis;
}
