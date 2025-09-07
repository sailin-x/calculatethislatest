export interface RealEstateCrowdfundingInputs {
  // Investment Information
  investmentAmount: number;
  totalProjectCost: number;
  minimumInvestment: number;
  maximumInvestment: number;
  numberOfInvestors: number;
  investorEquity: number;

  // Project Information
  propertyValue: number;
  propertyType: 'residential' | 'commercial' | 'mixed_use' | 'industrial';
  propertyLocation: string;
  projectStage: 'pre_construction' | 'under_construction' | 'stabilized' | 'redevelopment';
  expectedHoldPeriod: number; // months
  expectedExitValue: number;

  // Financial Information
  annualRentIncome: number;
  operatingExpenses: number;
  managementFees: number;
  maintenanceReserve: number;
  insuranceCosts: number;
  propertyTaxes: number;

  // Crowdfunding Platform Fees
  platformFee: number; // percentage
  transactionFee: number; // percentage
  servicingFee: number; // annual percentage
  exitFee: number; // percentage

  // Financing Information
  loanToValue: number; // percentage
  interestRate: number; // percentage
  loanTerm: number; // months
  debtServiceCoverage: number;

  // Market Information
  marketRentGrowth: number; // percentage
  propertyAppreciation: number; // percentage
  capRate: number; // percentage
  marketCapRate: number; // percentage

  // Risk Factors
  occupancyRate: number; // percentage
  tenantQuality: 'A' | 'B' | 'C' | 'D';
  locationRisk: 'low' | 'medium' | 'high';
  marketRisk: 'low' | 'medium' | 'high';
  regulatoryRisk: 'low' | 'medium' | 'high';

  // Tax Information
  depreciationSchedule: number; // years
  taxRate: number; // percentage
  depreciationBonus: number; // percentage

  // Analysis Parameters
  analysisPeriod: number; // years
  discountRate: number; // percentage
  inflationRate: number; // percentage
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
}

export interface RealEstateCrowdfundingMetrics {
  // Investment Metrics
  equityPercentage: number;
  ownershipPercentage: number;
  totalEquityRaised: number;
  remainingEquityNeeded: number;

  // Return Metrics
  annualCashFlow: number;
  cashOnCashReturn: number;
  totalReturn: number;
  IRR: number;
  NPV: number;

  // Fee Analysis
  totalPlatformFees: number;
  effectivePlatformFee: number;
  netInvestorReturn: number;

  // Risk Metrics
  riskScore: number;
  probabilityOfDefault: number;
  expectedLoss: number;
  sharpeRatio: number;

  // Cash Flow Analysis
  monthlyCashFlow: number;
  projectedAnnualCashFlow: number;
  cumulativeCashFlow: number[];
  paybackPeriod: number;

  // Tax Benefits
  annualDepreciation: number;
  taxSavings: number;
  afterTaxCashFlow: number;
  afterTaxIRR: number;

  // Sensitivity Analysis
  sensitivityMatrix: Array<{
    variable: string;
    values: number[];
    impacts: number[];
  }>;

  // Scenario Analysis
  scenarios: Array<{
    scenario: string;
    probability: number;
    return: number;
    risk: number;
  }>;
}

export interface RealEstateCrowdfundingAnalysis {
  // Executive Summary
  investmentRating: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';

  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];

  // Financial Analysis
  financialSummary: string;
  returnAnalysis: string;
  cashFlowAnalysis: string;
  taxAnalysis: string;

  // Risk Assessment
  riskAssessment: string;
  marketRisk: string;
  operationalRisk: string;
  regulatoryRisk: string;

  // Investment Strategy
  investmentStrategy: string;
  diversificationBenefits: string;
  exitStrategy: string;

  // Recommendations
  investmentRecommendations: string[];
  riskMitigation: string[];
  monitoringRecommendations: string[];

  // Performance Benchmarks
  performanceBenchmarks: Array<{
    metric: string;
    value: number;
    benchmark: number;
    industry: string;
  }>;

  // Decision Support
  decisionSummary: string;
  investmentChecklist: string[];
  dueDiligenceItems: string[];
}

export interface RealEstateCrowdfundingOutputs {
  // Core Metrics
  equityPercentage: number;
  cashOnCashReturn: number;
  totalReturn: number;
  IRR: number;
  riskScore: number;

  // Analysis
  analysis: RealEstateCrowdfundingAnalysis;

  // Additional Metrics
  monthlyCashFlow: number;
  annualCashFlow: number;
  netInvestorReturn: number;
  afterTaxCashFlow: number;
  paybackPeriod: number;
  sensitivityMatrix: any[];
  scenarios: any[];
  performanceBenchmarks: any[];
}