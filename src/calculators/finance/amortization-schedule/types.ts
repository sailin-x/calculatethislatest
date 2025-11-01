export interface AmortizationScheduleInputs {
  loanAmount: number;
  annualInterestRate: number;
  loanTermYears: number;
  startDate?: string; // Optional start date for the schedule
  extraPayment?: number; // Optional extra payment per period
}

export interface AmortizationScheduleEntry {
  period: number;
  paymentDate: string;
  beginningBalance: number;
  scheduledPayment: number;
  extraPayment: number;
  totalPayment: number;
  principalPayment: number;
  interestPayment: number;
  endingBalance: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}

export interface AmortizationScheduleMetrics {
  totalPayments: number;
  totalInterest: number;
  totalPrincipal: number;
  numberOfPayments: number;
  lastPaymentDate: string;
  payoffDate: string;
  totalAmountPaid: number;
  interestToPrincipalRatio: number;
}

export interface AmortizationScheduleAnalysis {
  efficiency: string;
  recommendations: string[];
  paymentBreakdown: {
    earlyPayments: number;
    midPayments: number;
    latePayments: number;
  };
  interestAnalysis: string;
}

export interface AmortizationScheduleOutputs {
  schedule: AmortizationScheduleEntry[];
  metrics: AmortizationScheduleMetrics;
  analysis: AmortizationScheduleAnalysis;
  summary: {
    monthlyPayment: number;
    totalPayments: number;
    totalInterest: number;
    loanPayoffDate: string;
  };
}