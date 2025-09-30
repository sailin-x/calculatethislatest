export interface MortgagePaymentCalculatorInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  propertyTaxes?: number;
  homeownersInsurance?: number;
  pmi?: number;
  extraPayment?: number;
}

export interface MortgagePaymentCalculatorOutputs {
  monthlyPrincipalAndInterest: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalPayments: number;
  payoffDate: string;
}
