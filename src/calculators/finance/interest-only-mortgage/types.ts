export interface InterestOnlyMortgageCalculatorInputs {
  loanAmount: number;
  interestRate: number;
  interestOnlyPeriod: number;
  totalTerm: number;
  propertyValue?: number;
  downPayment?: number;
}

export interface InterestOnlyMortgageCalculatorOutputs {
  monthlyInterestOnlyPayment: number;
  monthlyAmortizingPayment: number;
  totalInterestPaid: number;
  totalPayments: number;
  loanToValueRatio: number;
  payoffAmount: number;
}
