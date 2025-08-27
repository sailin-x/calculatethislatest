export interface CommercialRealEstateCashFlowInputs {
  propertyValue: number;
  purchasePrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  grossRent: number;
  vacancyRate: number;
  operatingExpenses: {
    propertyTax: number;
    insurance: number;
    maintenance: number;
    propertyManagement: number;
    utilities: number;
    hoaFees: number;
    otherExpenses: number;
  };
  additionalIncome: number;
  appreciationRate: number;
  inflationRate: number;
  taxRate: number;
  depreciationPeriod: number;
}

export interface CashFlowMetrics {
  grossOperatingIncome: number;
  effectiveGrossIncome: number;
  totalOperatingExpenses: number;
  netOperatingIncome: number;
  debtService: number;
  cashFlowBeforeTax: number;
  depreciation: number;
  taxableIncome: number;
  taxes: number;
  cashFlowAfterTax: number;
  cashOnCashReturn: number;
  capRate: number;
  debtServiceCoverageRatio: number;
  breakEvenOccupancy: number;
  totalReturn: number;
}

export interface CashFlowAnalysis {
  investmentGrade: string;
  riskAssessment: string;
  cashFlowStability: string;
  recommendations: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface CommercialRealEstateCashFlowOutputs extends CashFlowMetrics {
  analysis: CashFlowAnalysis;
}
