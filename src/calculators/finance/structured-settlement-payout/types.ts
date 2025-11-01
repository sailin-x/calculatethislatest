export interface StructuredSettlementPayoutInputs {
  settlementAmount: number;
  payoutPeriod: number;
  paymentFrequency: 'monthly' | 'quarterly' | 'annually' | 'lump_sum';
  discountRate: number;
  inflationRate: number;
  taxRate: number;
  lumpSumOffer?: number;
  currentAge: number;
  lifeExpectancy: number;
  riskTolerance: 'low' | 'medium' | 'high';
  investmentReturn: number;
  analysisPeriod: number;
}

export interface StructuredSettlementPayoutOutputs {
  totalStructuredPayments: number;
  lumpSumEquivalent: number;
  netPresentValueStructured: number;
  netPresentValueLumpSum: number;
  taxSavings: number;
  breakEvenPeriod: number;
  monthlyPayment: number;
  annualPayment: number;
  totalPaymentsOverLife: number;
  remainingValueAtDeath: number;
  paymentSchedule: Array<{
    period: number;
    payment: number;
    cumulativePayments: number;
    presentValue: number;
  }>;
  comparisonAnalysis: {
    structuredAdvantage: number;
    lumpSumAdvantage: number;
    recommendation: string;
    riskAssessment: string;
  };
  sensitivityAnalysis: Array<{
    scenario: string;
    npvStructured: number;
    npvLumpSum: number;
    advantage: number;
  }>;
}