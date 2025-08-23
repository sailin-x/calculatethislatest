export interface RealEstateInvestmentInputs {
  // Property Details
  propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse' | 'commercial' | 'industrial' | 'land' | 'mixed-use';
  purchasePrice: number;
  downPayment: number;
  closingCosts: number;
  renovationCosts?: number;
  
  // Financing
  loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'hard-money' | 'cash';
  interestRate: number;
  loanTerm: number;
  points?: number;
  
  // Income
  monthlyRent: number;
  otherIncome?: number; // parking, storage, etc.
  vacancyRate: number;
  
  // Expenses
  propertyTax: number;
  insurance: number;
  hoaFees?: number;
  propertyManagement?: number;
  maintenance: number;
  utilities?: number;
  landscaping?: number;
  pestControl?: number;
  
  // Market & Growth
  appreciationRate: number;
  rentGrowthRate: number;
  expenseGrowthRate: number;
  
  // Exit Strategy
  holdingPeriod: number;
  sellingCosts: number;
  
  // Additional Factors
  location: 'a' | 'b' | 'c' | 'd';
  marketCondition: 'hot' | 'stable' | 'declining' | 'recovering';
  propertyAge: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  zoning: 'residential' | 'commercial' | 'mixed' | 'agricultural';
  
  // Optional Advanced
  taxRate?: number;
  depreciationRecapture?: boolean;
  section1031?: boolean;
  shortTermRental?: boolean;
  airbnbPotential?: boolean;
}

export interface RealEstateInvestmentResults {
  // Financial Metrics
  totalInvestment: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  cashOnCashReturn: number;
  capRate: number;
  grossRentMultiplier: number;
  netOperatingIncome: number;
  
  // ROI Metrics
  totalROI: number;
  annualizedROI: number;
  internalRateOfReturn: number;
  paybackPeriod: number;
  
  // Property Analysis
  breakEvenRent: number;
  maximumPurchasePrice: number;
  optimalRent: number;
  
  // Market Analysis
  marketValue: number;
  equityBuildUp: number;
  appreciationGain: number;
  
  // Cash Flow Analysis
  monthlyExpenses: number;
  monthlyIncome: number;
  netCashFlow: number;
  
  // Risk Metrics
  debtServiceCoverageRatio: number;
  loanToValueRatio: number;
  riskScore: number;
  
  // Projections
  fiveYearProjection: {
    year: number;
    marketValue: number;
    equity: number;
    cashFlow: number;
    totalReturn: number;
  }[];
  
  // Exit Analysis
  saleProceeds: number;
  totalProfit: number;
  profitMargin: number;
  
  // Comprehensive Report
  report: string;
  
  // Recommendations
  recommendations: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Market Comparison
  marketComparison: {
    metric: string;
    yourProperty: number;
    marketAverage: number;
    percentile: number;
  }[];
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    scenario: string;
    cashOnCashReturn: number;
    totalROI: number;
    riskLevel: string;
  }[];
}
