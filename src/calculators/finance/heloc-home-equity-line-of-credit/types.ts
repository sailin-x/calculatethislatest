export interface HelocInputs {
  homeValue: number;
  outstandingMortgageBalance: number;
  creditLimitPercentage: number; // Percentage of home equity available as HELOC
  interestRate: number;
  drawPeriodYears: number; // Years until repayment begins
  repaymentPeriodYears: number; // Years to repay the drawn amount
  monthlyDrawAmount?: number; // Optional fixed monthly draw
  oneTimeDrawAmount?: number; // Optional one-time draw amount
}

export interface HelocMetrics {
  availableCredit: number;
  maximumCreditLimit: number;
  monthlyPaymentDuringDraw: number;
  monthlyPaymentDuringRepayment: number;
  totalInterestPaid: number;
  totalPayments: number;
  payoffDate: string;
}

export interface HelocAnalysis {
  equityPosition: string;
  riskLevel: 'low' | 'moderate' | 'high';
  recommendations: string[];
  costComparison: {
    vsTraditionalLoan: string;
    vsCreditCard: string;
    vsPersonalLoan: string;
  };
}

export interface HelocOutputs {
  availableCredit: number;
  maximumCreditLimit: number;
  monthlyPaymentDuringDraw: number;
  monthlyPaymentDuringRepayment: number;
  totalInterestPaid: number;
  totalPayments: number;
  payoffDate: string;
  analysis: HelocAnalysis;
}