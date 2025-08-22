export interface MezzanineFinancingRealEstateInputs {
  // Property Details
  propertyValue: number;
  seniorDebtAmount: number;
  seniorDebtRate: number;
  
  // Mezzanine Financing
  mezzanineAmount: number;
  mezzanineRate: number;
  mezzanineTerm: number;
  equityKicker: number;
  
  // Property Performance
  netOperatingIncome: number;
  projectedValueIncrease: number;
  
  // Risk Factors
  marketRiskAdjustment: number;
  exitStrategy: 'sale' | 'refinance' | 'extension';
}

export interface MezzanineFinancingRealEstateOutputs {
  // Financial Metrics
  totalLeverageRatio: number;
  mezzanineLTV: number;
  
  // Returns
  mezzanineCurrentYield: number;
  mezzanineIRR: number;
  totalReturn: number;
  
  // Coverage Ratios
  debtServiceCoverage: number;
  interestCoverage: number;
  
  // Risk Metrics
  loanToValueRatio: number;
  equityBuffer: number;
  breakEvenOccupancy: number;
  
  // Summary
  recommendationScore: number;
  riskLevel: string;
  report: string;
}

export interface MezzanineFinancingMetrics {
  // Financial Metrics
  totalLeverageRatio: number;
  mezzanineLTV: number;
  
  // Returns
  mezzanineCurrentYield: number;
  mezzanineIRR: number;
  totalReturn: number;
  
  // Coverage Ratios
  debtServiceCoverage: number;
  interestCoverage: number;
  
  // Risk Metrics
  loanToValueRatio: number;
  equityBuffer: number;
  breakEvenOccupancy: number;
  
  // Summary
  recommendationScore: number;
  riskLevel: string;
  
  // Additional calculations
  annualInterestPayment: number;
  seniorDebtService: number;
  totalDebtService: number;
  equityKickerValue: number;
  projectedPropertyValue: number;
  cashOnCashReturn: number;
  riskAdjustedReturn: number;
}
