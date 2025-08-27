export interface EscrowAnalysisInputs {
  propertyValue: number;
  loanAmount: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  privateMortgageInsurance: number;
  floodInsurance: number;
  otherInsurance: number;
  escrowAccount: boolean;
  currentEscrowBalance: number;
  monthlyEscrowPayment: number;
  annualPropertyTaxIncrease: number;
  annualInsuranceIncrease: number;
  escrowShortage: number;
  escrowSurplus: number;
  propertyTaxFrequency: 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
  insuranceFrequency: 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
  propertyLocation: string;
  propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse' | 'manufactured';
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo';
  escrowAnalysisDate: string;
  nextPropertyTaxDue: string;
  nextInsuranceDue: string;
  escrowCushion: number;
  minimumEscrowBalance: number;
  maximumEscrowBalance: number;
  escrowAccountInterest: number;
  escrowAccountFees: number;
  propertyTaxExemptions: number;
  insuranceDiscounts: number;
  escrowWaiverEligible: boolean;
  escrowWaiverRequirements: string;
  escrowAccountType: 'required' | 'optional' | 'waived';
  escrowAccountStatus: 'active' | 'inactive' | 'suspended' | 'terminated';
  escrowAccountHistory: Array<{
    date: string;
    transaction: string;
    amount: number;
    balance: number;
  }>;
  escrowAccountProjections: Array<{
    month: string;
    propertyTaxes: number;
    insurance: number;
    pmi: number;
    other: number;
    total: number;
    balance: number;
  }>;
}

export interface EscrowAnalysisMetrics {
  totalEscrowPayments: number;
  totalEscrowDisbursements: number;
  escrowAccountBalance: number;
  escrowShortage: number;
  escrowSurplus: number;
  monthlyEscrowPayment: number;
  newMonthlyEscrowPayment: number;
  escrowPaymentChange: number;
  escrowPaymentIncrease: number;
  escrowPaymentDecrease: number;
  escrowCushion: number;
  minimumEscrowBalance: number;
  maximumEscrowBalance: number;
  escrowAccountInterest: number;
  escrowAccountFees: number;
  netEscrowCost: number;
  escrowEfficiency: number;
  escrowUtilization: number;
  escrowAccountROI: number;
  escrowAccountNPV: number;
  escrowAccountIRR: number;
  escrowAccountPaybackPeriod: number;
  escrowAccountBreakEven: number;
  escrowAccountSavings: number;
  escrowAccountCosts: number;
  escrowAccountBenefits: number;
  escrowAccountRisks: number;
  escrowAccountOpportunities: number;
  escrowAccountRecommendations: string;
  escrowAccountGrade: string;
  escrowAccountStatus: string;
  escrowAccountTrend: string;
  escrowAccountForecast: string;
  escrowAccountSensitivity: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface EscrowAnalysisAnalysis {
  escrowGrade: string;
  accountStatus: string;
  recommendations: string;
  trendAnalysis: string;
  forecastAnalysis: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface EscrowAnalysisOutputs extends EscrowAnalysisMetrics {
  analysis: EscrowAnalysisAnalysis;
}
