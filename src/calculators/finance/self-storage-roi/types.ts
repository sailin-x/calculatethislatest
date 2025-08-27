export interface SelfStorageROIInputs {
  propertyValue: number;
  purchasePrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  totalUnits: number;
  unitTypes: Array<{
    size: number;
    quantity: number;
    monthlyRate: number;
    occupancyRate: number;
  }>;
  operatingExpenses: {
    propertyTax: number;
    insurance: number;
    utilities: number;
    maintenance: number;
    propertyManagement: number;
    marketing: number;
    security: number;
    otherExpenses: number;
  };
  constructionCosts: number;
  landValue: number;
  appreciationRate: number;
  inflationRate: number;
  taxRate: number;
  holdingPeriod: number;
  exitStrategy: 'sell' | 'refinance' | '1031-exchange' | 'hold';
}

export interface SelfStorageROIMetrics {
  totalInvestment: number;
  grossRevenue: number;
  effectiveRevenue: number;
  totalOperatingExpenses: number;
  netOperatingIncome: number;
  debtService: number;
  cashFlow: number;
  cashOnCashReturn: number;
  capRate: number;
  totalReturn: number;
  irr: number;
  paybackPeriod: number;
  breakEvenOccupancy: number;
  valuePerUnit: number;
  revenuePerSquareFoot: number;
  totalProfit: number;
  roi: number;
}

export interface SelfStorageAnalysis {
  investmentGrade: string;
  riskAssessment: string;
  marketOutlook: string;
  recommendations: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface SelfStorageROIOutputs extends SelfStorageROIMetrics {
  analysis: SelfStorageAnalysis;
}
