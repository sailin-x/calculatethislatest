export interface IrrevocableLifeInsuranceTrustIlitValueCalculatorInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface IrrevocableLifeInsuranceTrustIlitValueCalculatorMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface IrrevocableLifeInsuranceTrustIlitValueCalculatorAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface IrrevocableLifeInsuranceTrustIlitValueCalculatorOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: IrrevocableLifeInsuranceTrustIlitValueCalculatorAnalysis;
}
