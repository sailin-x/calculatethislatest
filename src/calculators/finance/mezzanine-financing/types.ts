export interface MezzanineFinancingInputs {
  propertyValue: number;
  seniorLoanAmount: number;
  mezzanineLoanAmount: number;
  seniorInterestRate: number;
  mezzanineInterestRate: number;
  seniorLoanTerm: number;
  mezzanineLoanTerm: number;
  seniorLoanFees: number;
  mezzanineLoanFees: number;
  propertyTaxes: number;
  insurance: number;
  maintenance: number;
  utilities: number;
  managementFees: number;
  vacancyRate: number;
  annualRent: number;
  operatingExpenses: number;
  holdingPeriod: number;
  appreciationRate: number;
  depreciationRate: number;
  taxRate: number;
  exitCosts: number;
}

export interface MezzanineFinancingMetrics {
  totalLoanAmount: number;
  blendedInterestRate: number;
  monthlyPayment: number;
  annualPayment: number;
  totalInterestPaid: number;
  totalFees: number;
  loanToValueRatio: number;
  debtServiceCoverageRatio: number;
  cashOnCashReturn: number;
  totalReturn: number;
  internalRateOfReturn: number;
  netPresentValue: number;
  paybackPeriod: number;
  profitMargin: number;
  equityMultiple: number;
  annualizedReturn: number;
  totalProfit: number;
  totalInvestment: number;
}

export interface MezzanineFinancingAnalysis {
  isFeasible: boolean;
  riskLevel: 'Low' | 'Medium' | 'High';
  recommendation: string;
  keyStrengths: string[];
  keyRisks: string[];
  marketComparison: {
    averageLTV: number;
    averageDSCR: number;
    marketPosition: 'Above Market' | 'At Market' | 'Below Market';
  };
  sensitivityAnalysis: {
    interestRateIncrease: number;
    propertyValueDecrease: number;
    rentDecrease: number;
  };
}

export interface MezzanineFinancingOutputs extends MezzanineFinancingMetrics {
  analysis: MezzanineFinancingAnalysis;
}
