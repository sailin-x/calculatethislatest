export interface ReverseMortgageInputs {
  homeValue: number;
  borrowerAge: number;
  youngestBorrowerAge: number;
  interestRate: number;
  expectedAppreciation: number;
  counselingFee: number;
  originationFee: number;
  servicingFeeSetAside: number;
  mortgageInsurancePremium: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  hoaFees: number;
  maintenanceCost: number;
  repairSetAside: number;
  lifeExpectancy: number;
  paymentPlan: 'tenure' | 'term' | 'line-of-credit';
  termYears: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  existingMortgageBalance: number;
}

export interface ReverseMortgageResults {
  principalLimit: number;
  netPrincipalLimit: number;
  availableLoanAmount: number;
  monthlyLoanAdvance: number;
  totalLoanAdvances: number;
  totalInterestPaid: number;
  totalFeesPaid: number;
  totalLoanBalance: number;
  remainingEquity: number;
  loanToValueRatio: number;
  breakEvenYears: number;
  monthlyCashFlow: number;
  totalCashReceived: number;
  netWorthImpact: number;
  sustainabilityYears: number;
  riskAssessment: string;
  recommendation: string;
}