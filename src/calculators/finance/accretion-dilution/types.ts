export interface AccretionDilutionInputs {
  // Target Company Information
  targetRevenue: number;
  targetEBITDA: number;
  targetNetIncome: number;
  targetSharesOutstanding: number;
  targetSharePrice: number;
  targetDebt: number;
  targetCash: number;
  
  // Acquirer Company Information
  acquirerRevenue: number;
  acquirerEBITDA: number;
  acquirerNetIncome: number;
  acquirerSharesOutstanding: number;
  acquirerSharePrice: number;
  acquirerDebt: number;
  acquirerCash: number;
  
  // Deal Structure
  purchasePrice: number;
  cashPortion: number; // Percentage paid in cash
  stockPortion: number; // Percentage paid in stock
  debtFinancing: number; // Amount of new debt raised
  
  // Transaction Details
  transactionCosts: number;
  integrationCosts: number;
  synergiesRevenue: number; // Annual revenue synergies
  synergiesCost: number; // Annual cost synergies
  synergyRampPeriod: number; // Years to fully realize synergies
  
  // Financing Terms
  debtInterestRate: number;
  taxRate: number;
  
  // Analysis Parameters
  analysisYears: number;
  discountRate: number;
  terminalGrowthRate: number;
  
  // Premium Analysis
  controlPremium: number;
  marketMultiple: number; // EV/EBITDA multiple for valuation
  
  // Integration Assumptions
  revenueAttrition: number; // Percentage of target revenue lost during integration
  costInflation: number; // Annual cost inflation rate
  
  // Financing Mix
  preferredStock: number; // Amount of preferred stock issued
  preferredDividendRate: number;
  
  // Regulatory and Other
  regulatoryApprovalTime: number; // Months
  breakupFee: number;
  
  // Sensitivity Analysis
  sensitivityRange: number; // +/- percentage for sensitivity analysis
  
  // Deal Type
  dealType: 'merger' | 'acquisition' | 'tender-offer' | 'management-buyout';
  paymentMethod: 'cash' | 'stock' | 'mixed';
  
  // Industry Factors
  industryGrowthRate: number;
  cyclicalAdjustment: number;
  
  // Risk Factors
  executionRisk: number; // Percentage probability of successful integration
  marketRisk: number; // Beta adjustment for market conditions
  
  // Post-Transaction Metrics
  expectedCostOfCapital: number;
  expectedROIC: number;
  expectedPaybackPeriod: number;
}

export interface AccretionDilutionMetrics {
  // Pre-Transaction Metrics
  targetEnterpriseValue: number;
  targetEquityValue: number;
  targetEVEBITDA: number;
  targetPERatio: number;
  
  acquirerEnterpriseValue: number;
  acquirerEquityValue: number;
  acquirerEVEBITDA: number;
  acquirerPERatio: number;
  
  // Transaction Metrics
  totalTransactionValue: number;
  premiumPaid: number;
  premiumPercentage: number;
  exchangeRatio: number;
  newSharesIssued: number;
  
  // Pro Forma Metrics (Year 1)
  proFormaRevenue: number;
  proFormaEBITDA: number;
  proFormaNetIncome: number;
  proFormaSharesOutstanding: number;
  proFormaEPS: number;
  
  // Accretion/Dilution Analysis
  epsAccretionDilution: number; // Percentage change in EPS
  epsBreakevenPrice: number; // Target price where EPS is neutral
  
  // Synergy Analysis
  totalSynergies: number;
  netPresentValueSynergies: number;
  synergyMultiple: number; // Synergies / Premium paid
  
  // Returns Analysis
  internalRateOfReturn: number;
  returnOnInvestment: number;
  paybackPeriod: number;
  
  // Financing Impact
  newDebtServiceCoverage: number;
  proFormaLeverage: number; // Debt/EBITDA
  interestCoverageRatio: number;
  
  // Valuation Metrics
  impliedEVEBITDA: number;
  impliedPERatio: number;
  fairValueEstimate: number;
  
  // Risk Metrics
  scenarioAnalysis: {
    base: number;
    optimistic: number;
    pessimistic: number;
  };
  
  // Integration Metrics
  integrationComplexity: number;
  culturalFit: number;
  operationalOverlap: number;
}

export interface AccretionDilutionAnalysis {
  // Executive Summary
  recommendationRating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  keyDrivers: string[];
  majorRisks: string[];
  criticalSuccessFactors: string[];
  
  // Financial Impact Summary
  yearOneImpact: {
    epsChange: number;
    revenueGrowth: number;
    marginImpact: number;
    roicChange: number;
  };
  
  // Strategic Rationale
  strategicFit: string;
  marketPosition: string;
  competitiveAdvantages: string[];
  synergySources: string[];
  
  // Transaction Structure Analysis
  optimalStructure: string;
  financingRecommendations: string[];
  alternativeStructures: string[];
  
  // Integration Planning
  integrationTimeline: string;
  keyMilestones: string[];
  resourceRequirements: string;
  riskMitigation: string[];
  
  // Valuation Analysis
  valuationMethods: string[];
  comparableTransactions: string;
  discountedCashFlow: string;
  marketMultiples: string;
  
  // Sensitivity Analysis
  keyVariables: string[];
  breakEvenScenarios: string[];
  worstCaseImpact: string;
  bestCaseUpside: string;
  
  // Regulatory and Legal
  regulatoryRisks: string[];
  antitrust: string;
  approvalTimeline: string;
  contingencyPlanning: string;
  
  // Post-Merger Integration
  organizationalStructure: string;
  talentRetention: string;
  systemsIntegration: string;
  customerRetention: string;
  
  // Performance Tracking
  kpiFramework: string[];
  milestoneTracking: string;
  valueRealizationPlan: string;
  
  // Market and Industry Context
  industryTrends: string;
  competitiveLandscape: string;
  marketTiming: string;
  macroeconomicFactors: string;
}

export interface AccretionDilutionOutputs extends AccretionDilutionMetrics {
  analysis: AccretionDilutionAnalysis;
  
  // Additional Output Metrics
  confidenceLevel: number;
  modelAccuracy: number;
  dataQuality: number;
  
  // Detailed Projections (5-year)
  projectedMetrics: {
    year: number;
    revenue: number;
    ebitda: number;
    netIncome: number;
    eps: number;
    fcf: number;
    roic: number;
  }[];
  
  // Transaction Timeline
  timeline: {
    phase: string;
    duration: number;
    keyActivities: string[];
    dependencies: string[];
  }[];
  
  // Risk Assessment
  riskProfile: {
    category: string;
    probability: number;
    impact: number;
    mitigation: string;
  }[];
  
  // Value Creation Opportunities
  valueDrivers: {
    source: string;
    potential: number;
    timeline: number;
    probability: number;
  }[];
}
