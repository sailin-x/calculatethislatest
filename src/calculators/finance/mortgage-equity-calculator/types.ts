export interface MortgageEquityInputs {
  propertyValue: number;
  loanBalance: number;
  originalLoanAmount: number;
  monthlyPayment: number;
  interestRate: number;
  loanTerm: number;
  monthsPaid: number;
  propertyAppreciationRate: number;
  marketGrowthRate: number;
  analysisPeriod: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  hoaFees: number;
  maintenanceCosts: number;
  vacancyRate: number;
  propertyManagementFee: number;
  rentalIncome: number;
}

export interface MortgageEquityOutputs {
  currentEquity: number;
  equityPercentage: number;
  loanToValueRatio: number;
  equityGrowth: {
    period: number;
    equityAmount: number;
    equityPercentage: number;
    propertyValue: number;
    loanBalance: number;
  }[];
  equityBuildUp: {
    principalPaid: number;
    appreciation: number;
    totalEquity: number;
  };
  cashFlowAnalysis: {
    monthlyIncome: number;
    monthlyExpenses: number;
    monthlyCashFlow: number;
    annualCashFlow: number;
    cashOnCashReturn: number;
  };
  breakevenAnalysis: {
    breakevenMonths: number;
    breakevenYears: number;
    totalInvestment: number;
    totalReturn: number;
  };
  riskAssessment: {
    equityRisk: 'Low' | 'Medium' | 'High';
    marketRisk: 'Low' | 'Medium' | 'High';
    cashFlowRisk: 'Low' | 'Medium' | 'High';
    overallRisk: 'Low' | 'Medium' | 'High';
    recommendations: string[];
  };
}