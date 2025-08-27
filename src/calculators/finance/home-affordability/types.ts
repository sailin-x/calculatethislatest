export interface HomeAffordabilityInputs {
  annualIncome: number;
  monthlyDebtPayments: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTaxRate: number;
  homeownersInsuranceRate: number;
  privateMortgageInsuranceRate: number;
  debtToIncomeRatio: number;
  creditScore: number;
  propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse' | 'manufactured';
  propertyLocation: string;
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo';
  closingCosts: number;
  monthlyUtilities: number;
  maintenanceCosts: number;
  hoaFees: number;
  emergencyFund: number;
  otherMonthlyExpenses: number;
}

export interface HomeAffordabilityMetrics {
  maximumHomePrice: number;
  maximumLoanAmount: number;
  monthlyMortgagePayment: number;
  monthlyPropertyTaxes: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  totalMonthlyPayment: number;
  debtToIncomeRatio: number;
  frontEndRatio: number;
  backEndRatio: number;
  downPaymentPercentage: number;
  loanToValueRatio: number;
  affordabilityScore: number;
  recommendedHomePrice: number;
  monthlySavings: number;
  annualSavings: number;
}

export interface HomeAffordabilityAnalysis {
  affordabilityGrade: string;
  riskAssessment: string;
  recommendations: string;
  marketComparison: string;
  budgetAnalysis: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface HomeAffordabilityOutputs extends HomeAffordabilityMetrics {
  analysis: HomeAffordabilityAnalysis;
}
