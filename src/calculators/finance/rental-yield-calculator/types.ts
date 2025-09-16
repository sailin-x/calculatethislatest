export interface RentalYieldInputs {
  propertyPrice: number;
  monthlyRent: number;
  vacancyRate: number;
  annualOperatingExpenses: number;
  annualPropertyTaxes: number;
  annualInsurance: number;
  annualMaintenance: number;
  annualManagementFees: number;
  otherAnnualCosts: number;
  financingType: 'cash' | 'financed';
  downPaymentPercentage: number;
  interestRate: number;
  loanTerm: number;
}

export interface RentalYieldResults {
  grossRentalYield: number;
  netRentalYield: number;
  cashOnCashReturn: number;
  capRate: number;
  totalAnnualIncome: number;
  totalAnnualExpenses: number;
  netOperatingIncome: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  breakEvenRatio: number;
  debtServiceCoverageRatio: number;
  returnOnInvestment: number;
  internalRateOfReturn: number;
  totalInvestment: number;
  financingCosts: number;
  loanPayment: number;
  equityPercentage: number;
}