export interface LeaseBuyoutMetrics {
  monthlyPayment: number;
  totalCashInvested: number;
  monthlyExpenses: number;
  netOperatingIncome: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  capRate: number;
  cashOnCashReturn: number;
  totalReturn: number;
  rentSavings: number;
  annualRentSavings: number;
  breakEvenMonths: number;
  loanToValue: number;
  debtServiceCoverage: number;
}

export interface BuyoutAnalysis {
  buyoutGrade: string;
  riskAssessment: string;
  recommendations: string;
}

export interface CommercialLeaseBuyoutInputs {
  propertyValue: number;
  buyoutPrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  currentRent: number;
  marketRent: number;
  remainingLeaseTerm: number;
  closingCosts?: number;
  propertyTax?: number;
  insurance?: number;
  maintenance?: number;
  propertyManagement?: number;
  hoaFees?: number;
  otherExpenses?: number;
  appreciationRate?: number;
  inflationRate?: number;
  taxRate?: number;
}

export interface CommercialLeaseBuyoutOutputs extends LeaseBuyoutMetrics {
  analysis: BuyoutAnalysis;
}
