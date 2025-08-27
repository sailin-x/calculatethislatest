export interface CommercialRealEstateLoanAmortizationInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  paymentFrequency: 'monthly' | 'quarterly' | 'annually';
  startDate: string;
  balloonPayment?: number;
  prepaymentPenalty?: number;
  escrowAccount?: {
    propertyTax: number;
    insurance: number;
    otherExpenses: number;
  };
  additionalPayments?: number;
  paymentIncrease?: number;
  increaseFrequency?: number;
}

export interface AmortizationSchedule {
  paymentNumber: number;
  paymentDate: string;
  beginningBalance: number;
  payment: number;
  principal: number;
  interest: number;
  endingBalance: number;
  totalInterest: number;
  totalPrincipal: number;
  escrowPayment?: number;
  totalPayment?: number;
}

export interface AmortizationMetrics {
  totalPayments: number;
  totalInterest: number;
  totalPrincipal: number;
  totalCost: number;
  effectiveInterestRate: number;
  averageMonthlyPayment: number;
  lastPaymentDate: string;
  payOffDate: string;
  interestSavings: number;
  timeSaved: number;
}

export interface AmortizationAnalysis {
  loanSummary: string;
  paymentBreakdown: string;
  interestAnalysis: string;
  prepaymentAnalysis: string;
  recommendations: string;
}

export interface CommercialRealEstateLoanAmortizationOutputs {
  schedule: AmortizationSchedule[];
  metrics: AmortizationMetrics;
  analysis: AmortizationAnalysis;
}
