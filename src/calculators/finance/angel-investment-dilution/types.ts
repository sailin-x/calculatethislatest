export interface AngelInvestmentDilutionInputs {
  // Company Information
  companyName: string;
  currentValuation: number; // Pre-money valuation
  totalSharesOutstanding: number; // Current shares outstanding
  
  // Investment Details
  investmentAmount: number; // Amount being invested
  investmentType: 'equity' | 'convertible_note' | 'safe' | 'preferred_stock';
  conversionPrice?: number; // For convertible notes/Safes
  discountRate?: number; // For convertible notes/Safes
  cap?: number; // Valuation cap for Safes
  
  // Shareholder Information
  existingShareholders: {
    name: string;
    shares: number;
    ownershipPercentage: number;
    shareClass: 'common' | 'preferred' | 'founder' | 'employee';
  }[];
  
  // Investment Terms
  antiDilutionProtection: boolean;
  antiDilutionType?: 'full_ratchet' | 'weighted_average' | 'broad_based' | 'narrow_based';
  participationRights: boolean;
  liquidationPreference: number; // Multiple of investment
  dividendRate?: number; // Annual dividend rate
  
  // Future Funding Rounds
  futureRounds: {
    round: string;
    amount: number;
    valuation: number;
    probability: number; // 0-100%
    monthsFromNow: number;
  }[];
  
  // Employee Stock Options
  optionPoolSize: number; // Number of options reserved
  optionPoolPercentage: number; // Percentage of total shares
  vestingSchedule: 'standard' | 'accelerated' | 'custom';
  vestingPeriod: number; // Months
  cliffPeriod: number; // Months
  
  // Financial Projections
  projectedRevenue: {
    year: number;
    revenue: number;
    growthRate: number;
  }[];
  
  projectedEBITDA: {
    year: number;
    ebitda: number;
    margin: number;
  }[];
  
  // Exit Scenarios
  exitScenarios: {
    scenario: string;
    probability: number; // 0-100%
    exitValue: number;
    exitYear: number;
    exitType: 'ipo' | 'acquisition' | 'merger' | 'secondary';
  }[];
  
  // Market Conditions
  marketConditions: 'bull' | 'bear' | 'neutral';
  sectorMultiples: {
    revenueMultiple: number;
    ebitdaMultiple: number;
    bookValueMultiple: number;
  };
  
  // Risk Factors
  riskFactors: {
    factor: string;
    impact: 'high' | 'medium' | 'low';
    probability: number; // 0-100%
  }[];
  
  // Legal and Compliance
  regulatoryCompliance: boolean;
  securitiesLawCompliance: boolean;
  taxImplications: {
    qualifiedSmallBusiness: boolean;
    section1202Eligible: boolean;
    longTermCapitalGains: boolean;
  };
  
  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'basis-points';
  includeCharts: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // Years to analyze
  discountRate: number; // Required rate of return
  sensitivityAnalysis: boolean;
  monteCarloSimulation: boolean;
  numberOfSimulations?: number;
}

export interface AngelInvestmentDilutionMetrics {
  // Pre-Investment Metrics
  preMoneyValuation: number;
  preMoneyShares: number;
  preMoneyOwnership: { [key: string]: number };
  
  // Investment Impact
  postMoneyValuation: number;
  newSharesIssued: number;
  effectivePricePerShare: number;
  ownershipDilution: { [key: string]: number };
  
  // Convertible Security Analysis
  conversionShares?: number;
  conversionPrice?: number;
  effectiveDiscount?: number;
  
  // Anti-Dilution Impact
  antiDilutionAdjustment?: number;
  adjustedConversionPrice?: number;
  adjustedShares?: number;
  
  // Future Round Impact
  futureRoundDilution: {
    round: string;
    preRoundOwnership: { [key: string]: number };
    postRoundOwnership: { [key: string]: number };
    dilution: { [key: string]: number };
  }[];
  
  // Option Pool Impact
  optionPoolDilution: { [key: string]: number };
  postOptionPoolOwnership: { [key: string]: number };
  
  // Exit Analysis
  exitReturns: {
    scenario: string;
    investorReturn: number;
    investorIRR: number;
    investorMOIC: number;
    founderReturn: number;
    founderIRR: number;
    founderMOIC: number;
  }[];
  
  // Risk-Adjusted Returns
  expectedReturn: number;
  expectedIRR: number;
  expectedMOIC: number;
  riskAdjustedReturn: number;
  
  // Sensitivity Analysis
  sensitivityMatrix: {
    variable: string;
    values: number[];
    returns: number[];
    irrs: number[];
  }[];
  
  // Monte Carlo Results
  monteCarloResults?: {
    meanReturn: number;
    medianReturn: number;
    standardDeviation: number;
    percentiles: { [key: string]: number };
    probabilityOfPositiveReturn: number;
  };
}

export interface AngelInvestmentDilutionAnalysis {
  // Executive Summary
  investmentRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  riskRating: 'Low' | 'Moderate' | 'High' | 'Very High';
  recommendation: 'Invest' | 'Pass' | 'Negotiate' | 'Strong Invest' | 'Strong Pass';
  
  // Key Insights
  keyStrengths: string[];
  keyWeaknesses: string[];
  riskFactors: string[];
  opportunities: string[];
  
  // Investment Analysis
  investmentSummary: string;
  dilutionAnalysis: string;
  returnAnalysis: string;
  
  // Valuation Analysis
  valuationAssessment: string;
  comparableAnalysis: string;
  growthProjections: string;
  
  // Risk Assessment
  riskProfile: string;
  marketRisk: string;
  executionRisk: string;
  
  // Term Sheet Analysis
  termSheetAssessment: string;
  negotiationPoints: string[];
  dealStructure: string;
  
  // Exit Strategy
  exitStrategy: string;
  exitTimeline: string;
  exitValueProjections: string;
  
  // Competitive Analysis
  competitivePosition: string;
  marketOpportunity: string;
  competitiveAdvantages: string[];
  
  // Team Assessment
  teamAssessment: string;
  managementCapability: string;
  executionTrackRecord: string;
  
  // Financial Analysis
  financialHealth: string;
  cashFlowProjections: string;
  fundingRequirements: string;
  
  // Legal and Compliance
  legalAssessment: string;
  complianceStatus: string;
  regulatoryRisks: string[];
  
  // Tax Implications
  taxAnalysis: string;
  taxBenefits: string[];
  taxRisks: string[];
  
  // Investment Structure
  optimalStructure: string;
  alternativeStructures: string[];
  structureRecommendations: string[];
  
  // Monitoring and Reporting
  monitoringPlan: string;
  reportingRequirements: string[];
  keyMetrics: string[];
  
  // Due Diligence
  dueDiligenceItems: string[];
  criticalIssues: string[];
  recommendedActions: string[];
  
  // Investment Timeline
  investmentTimeline: string;
  milestones: string[];
  keyDates: string[];
  
  // Portfolio Considerations
  portfolioFit: string;
  diversificationImpact: string;
  correlationAnalysis: string;
  
  // Market Context
  marketEnvironment: string;
  sectorOutlook: string;
  economicFactors: string[];
  
  // Sensitivity Analysis
  sensitivityFactors: {
    factor: string;
    impact: number;
    direction: 'positive' | 'negative';
  }[];
  
  // Implementation Considerations
  investmentProcess: string[];
  legalRequirements: string[];
  operationalRequirements: string[];
  
  // Post-Investment
  postInvestmentPlan: string;
  valueAddActivities: string[];
  monitoringFrequency: string;
  
  // Exit Planning
  exitPlanning: string;
  exitTriggers: string[];
  exitPreparation: string[];
  
  // Risk Management
  riskMitigation: string[];
  contingencyPlans: string[];
  insuranceRequirements: string[];
  
  // Performance Benchmarks
  performanceBenchmarks: {
    metric: string;
    target: number;
    benchmark: number;
    industry: string;
  }[];
  
  // Investment Committee
  committeeRecommendation: string;
  presentationPoints: string[];
  decisionFactors: string[];
}

export interface AngelInvestmentDilutionOutputs extends AngelInvestmentDilutionMetrics {
  analysis: AngelInvestmentDilutionAnalysis;
  
  // Additional Output Metrics
  dataQuality: number; // Data quality score (0-100)
  modelAccuracy: number; // Model accuracy score (0-100)
  confidenceLevel: number; // Overall confidence level (0-100)
  
  // Time Series Analysis
  ownershipOverTime: {
    year: number;
    ownership: { [key: string]: number };
    valuation: number;
    shares: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenario: string;
    probability: number;
    investorReturn: number;
    founderReturn: number;
    companyValue: number;
  }[];
  
  // Comparative Analysis
  comparativeAnalysis: {
    metric: string;
    thisInvestment: number;
    industryAverage: number;
    topQuartile: number;
    bottomQuartile: number;
  }[];
  
  // Risk Metrics
  riskMetrics: {
    metric: string;
    value: number;
    benchmark: number;
    riskLevel: 'low' | 'medium' | 'high';
  }[];
  
  // Financial Projections
  financialProjections: {
    year: number;
    revenue: number;
    ebitda: number;
    cashFlow: number;
    valuation: number;
  }[];
  
  // Investment Returns
  investmentReturns: {
    year: number;
    investorReturn: number;
    founderReturn: number;
    companyValue: number;
    ownership: { [key: string]: number };
  }[];
  
  // Dilution Impact
  dilutionImpact: {
    round: string;
    investor: string;
    preOwnership: number;
    postOwnership: number;
    dilution: number;
  }[];
  
  // Term Sheet Analysis
  termSheetAnalysis: {
    term: string;
    value: string;
    impact: 'positive' | 'negative' | 'neutral';
    recommendation: string;
  }[];
  
  // Due Diligence Checklist
  dueDiligenceChecklist: {
    category: string;
    items: {
      item: string;
      status: 'complete' | 'pending' | 'not_applicable';
      priority: 'high' | 'medium' | 'low';
      notes: string;
    }[];
  }[];
  
  // Investment Timeline
  investmentTimeline: {
    phase: string;
    duration: string;
    activities: string[];
    deliverables: string[];
  }[];
  
  // Post-Investment Plan
  postInvestmentPlan: {
    quarter: string;
    activities: string[];
    metrics: string[];
    milestones: string[];
  }[];
  
  // Exit Planning
  exitPlanning: {
    scenario: string;
    timeline: string;
    preparation: string[];
    requirements: string[];
  }[];
  
  // Risk Mitigation
  riskMitigation: {
    risk: string;
    mitigation: string;
    cost: number;
    effectiveness: number;
  }[];
  
  // Performance Tracking
  performanceTracking: {
    metric: string;
    current: number;
    target: number;
    frequency: string;
    owner: string;
  }[];
}
