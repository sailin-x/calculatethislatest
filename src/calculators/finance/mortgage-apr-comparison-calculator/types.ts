export interface MortgageAPRInputs {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  points: number;
  closingCosts: number;
  propertyTaxRate: number;
  homeInsurance: number;
  hoaFees: number;
  pmiRate?: number;
}

export interface MortgageAPRComparison {
  nominalRate: number;
  effectiveAPR: number;
  totalPayments: number;
  totalInterest: number;
  totalCost: number;
  monthlyPayment: number;
}

export interface MortgageAPRRecommendation {
  bestOption: string;
  savings: number;
  breakEvenPeriod: number;
  riskFactors: string[];
}
