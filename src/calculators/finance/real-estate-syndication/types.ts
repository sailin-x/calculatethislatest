// Real Estate Syndication Calculator Types
export interface RealEstateSyndicationInputs {
  // Project Information
  projectName: string;
  projectType: 'residential' | 'commercial' | 'mixed-use' | 'industrial' | 'retail' | 'office' | 'hotel' | 'multifamily' | 'single-family' | 'land-development';
  projectAddress: string;
  acquisitionDate: string;
  projectedHoldPeriod: number; // Years
  exitStrategy: 'sale' | 'refinance' | '1031-exchange' | 'hold' | 'partial-sale';
  
  // Property Details
  totalAcquisitionCost: number;
  propertyValue: number;
  landValue: number;
  buildingValue: number;
  squareFootage: number;
  numberOfUnits: number;
  occupancyRate: number; // Percentage
  currentRentRoll: number;
  projectedRentGrowth: number; // Annual percentage
  operatingExpenses: number;
  operatingExpenseRatio: number; // Percentage of gross income
  
  // Financing Structure
  totalEquityNeeded: number;
  sponsorEquity: number;
  investorEquity: number;
  debtFinancing: number;
  loanType: 'conventional' | 'fha' | 'usda' | 'va' | 'hard-money' | 'bridge' | 'construction' | 'permanent';
  interestRate: number; // Annual percentage
  loanTerm: number; // Years
  amortizationPeriod: number; // Years
  loanPoints: number; // Percentage
  loanFees: number;
  
  // Syndication Structure
  syndicationType: '506(b)' | '506(c)' | 'crowdfunding' | 'private-placement' | 'reit' | 'direct-investment';
  minimumInvestment: number;
  maximumInvestors: number;
  sponsorPromote: number; // Percentage
  managementFee: number; // Annual percentage of gross income
  acquisitionFee: number; // Percentage of acquisition cost
  dispositionFee: number; // Percentage of sale proceeds
  refinanceFee: number; // Percentage of refinance proceeds
  
  // Waterfall Structure
  preferredReturn: number; // Annual percentage
  catchUpPercentage: number; // Percentage after preferred return
  promoteTier1: number; // Percentage for first tier
  promoteTier2: number; // Percentage for second tier
  promoteTier3: number; // Percentage for third tier
  tier1Threshold: number; // IRR threshold for tier 1
  tier2Threshold: number; // IRR threshold for tier 2
  tier3Threshold: number; // IRR threshold for tier 3
  
  // Operating Assumptions
  grossRentMultiplier: number;
  capRate: number; // Percentage
  exitCapRate: number; // Percentage
  appreciationRate: number; // Annual percentage
  inflationRate: number; // Annual percentage
  vacancyRate: number; // Percentage
  collectionLossRate: number; // Percentage
  maintenanceReserve: number; // Monthly per unit
  capitalExpenditureReserve: number; // Annual percentage of gross income
  
  // Tax Information
  taxRate: number; // Federal tax rate
  stateTaxRate: number;
  localTaxRate: number;
  depreciationMethod: 'straight-line' | 'accelerated' | 'bonus' | 'cost-segregation';
  recoveryPeriod: number; // Years
  bonusDepreciationEligible: boolean;
  bonusDepreciationPercentage: number;
  
  // Exit Assumptions
  exitYear: number;
  exitValue: number;
  sellingCosts: number; // Percentage of sale price
  refinanceAmount: number;
  refinanceCosts: number;
  
  // Investor Information
  investorCount: number;
  averageInvestment: number;
  accreditedInvestorRequirement: boolean;
  foreignInvestorAllowed: boolean;
  selfDirectedIRAAllowed: boolean;
  
  // Compliance & Legal
  secCompliance: boolean;
  blueSkyCompliance: boolean;
  offeringMemorandum: boolean;
  operatingAgreement: boolean;
  subscriptionAgreement: boolean;
  legalFees: number;
  accountingFees: number;
  complianceFees: number;
  
  // Reporting Preferences
  reportFormat: 'detailed' | 'summary' | 'investor' | 'sponsor';
  includeCharts: boolean;
  includeTaxAnalysis: boolean;
  includeRiskAnalysis: boolean;
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
}

export interface RealEstateSyndicationMetrics {
  // Investment Metrics
  totalInvestment: number;
  totalEquityInvestment: number;
  totalDebtFinancing: number;
  loanToValueRatio: number; // Percentage
  loanToCostRatio: number; // Percentage
  debtServiceCoverageRatio: number;
  cashOnCashReturn: number; // Percentage
  capRate: number; // Percentage
  grossRentMultiplier: number;
  
  // Return Metrics
  projectedIRR: number; // Percentage
  projectedEquityMultiple: number;
  projectedTotalReturn: number; // Percentage
  projectedAnnualizedReturn: number; // Percentage
  projectedCashFlow: number; // Annual
  projectedCashOnCashReturn: number; // Percentage
  
  // Sponsor Metrics
  sponsorEquityContribution: number;
  sponsorEquityPercentage: number; // Percentage
  sponsorPromoteValue: number;
  sponsorTotalReturn: number; // Percentage
  sponsorIRR: number; // Percentage
  
  // Investor Metrics
  investorEquityContribution: number;
  investorEquityPercentage: number; // Percentage
  investorPreferredReturn: number; // Annual
  investorTotalReturn: number; // Percentage
  investorIRR: number; // Percentage
  investorEquityMultiple: number;
  
  // Operating Metrics
  netOperatingIncome: number;
  cashFlow: number; // Annual
  debtService: number; // Annual
  freeCashFlow: number; // Annual
  operatingExpenseRatio: number; // Percentage
  vacancyLoss: number; // Annual
  collectionLoss: number; // Annual
  
  // Exit Metrics
  exitValue: number;
  totalProceeds: number;
  investorProceeds: number;
  sponsorProceeds: number;
  totalGain: number;
  totalGainPercentage: number; // Percentage
  capitalGain: number;
  depreciationRecapture: number;
  
  // Risk Metrics
  breakEvenOccupancy: number; // Percentage
  breakEvenRent: number;
  maximumLoanAmount: number;
  minimumCashFlow: number;
  debtServiceCoverageRatio: number;
  interestCoverageRatio: number;
  
  // Fee Metrics
  totalFees: number;
  acquisitionFees: number;
  managementFees: number;
  dispositionFees: number;
  refinanceFees: number;
  legalFees: number;
  accountingFees: number;
  complianceFees: number;
}

export interface RealEstateSyndicationAnalysis {
  // Investment Analysis
  investmentAnalysis: string;
  returnAnalysis: string;
  riskAnalysis: string;
  cashFlowAnalysis: string;
  
  // Structure Analysis
  structureAnalysis: string;
  waterfallAnalysis: string;
  feeAnalysis: string;
  taxAnalysis: string;
  
  // Market Analysis
  marketAnalysis: string;
  competitiveAnalysis: string;
  locationAnalysis: string;
  
  // Risk Assessment
  riskAssessment: RiskAssessment;
  sensitivityAnalysis: SensitivityAnalysis;
  stressTestResults: StressTestResult[];
  
  // Recommendations
  recommendations: string[];
  keyBenefits: string[];
  keyRisks: string[];
  mitigationStrategies: string[];
  
  // Compliance Analysis
  complianceStatus: 'compliant' | 'review-required' | 'non-compliant';
  complianceIssues: string[];
  complianceRecommendations: string[];
}

export interface RiskAssessment {
  overallRisk: 'low' | 'medium' | 'high';
  riskScore: number; // 1-100
  marketRisk: 'low' | 'medium' | 'high';
  financialRisk: 'low' | 'medium' | 'high';
  operationalRisk: 'low' | 'medium' | 'high';
  regulatoryRisk: 'low' | 'medium' | 'high';
  liquidityRisk: 'low' | 'medium' | 'high';
  riskFactors: string[];
  riskMitigation: string[];
}

export interface SensitivityAnalysis {
  baseCase: SensitivityCase;
  optimisticCase: SensitivityCase;
  pessimisticCase: SensitivityCase;
  scenarios: SensitivityCase[];
}

export interface SensitivityCase {
  name: string;
  description: string;
  assumptions: Record<string, any>;
  results: {
    irr: number;
    equityMultiple: number;
    totalReturn: number;
    cashOnCashReturn: number;
    exitValue: number;
  };
}

export interface StressTestResult {
  scenario: string;
  description: string;
  assumptions: Record<string, any>;
  results: {
    irr: number;
    equityMultiple: number;
    totalReturn: number;
    cashOnCashReturn: number;
    breakEvenOccupancy: number;
    debtServiceCoverageRatio: number;
  };
  passed: boolean;
}

export interface CashFlowProjection {
  year: number;
  grossIncome: number;
  vacancyLoss: number;
  collectionLoss: number;
  effectiveGrossIncome: number;
  operatingExpenses: number;
  netOperatingIncome: number;
  debtService: number;
  cashFlow: number;
  cumulativeCashFlow: number;
  investorCashFlow: number;
  sponsorCashFlow: number;
}

export interface WaterfallCalculation {
  tier: number;
  tierName: string;
  irrThreshold: number;
  promotePercentage: number;
  investorShare: number; // Percentage
  sponsorShare: number; // Percentage
  description: string;
}

export interface InvestorSummary {
  totalInvestors: number;
  averageInvestment: number;
  minimumInvestment: number;
  maximumInvestment: number;
  totalEquityRaised: number;
  equityPercentage: number; // Percentage of total equity
  projectedReturn: number; // Percentage
  projectedIRR: number; // Percentage
  projectedEquityMultiple: number;
  preferredReturn: number; // Annual percentage
  projectedCashFlow: number; // Annual
}

export interface SponsorSummary {
  equityContribution: number;
  equityPercentage: number; // Percentage
  promoteValue: number;
  managementFees: number; // Annual
  acquisitionFees: number;
  dispositionFees: number;
  totalCompensation: number;
  projectedReturn: number; // Percentage
  projectedIRR: number; // Percentage
  projectedEquityMultiple: number;
}

export interface FeeStructure {
  acquisitionFee: number;
  managementFee: number; // Annual
  dispositionFee: number;
  refinanceFee: number;
  promotePercentage: number;
  totalFees: number;
  feeAnalysis: string;
}

export interface TaxAnalysis {
  depreciationDeduction: number; // Annual
  interestDeduction: number; // Annual
  totalDeductions: number; // Annual
  taxableIncome: number; // Annual
  taxLiability: number; // Annual
  taxSavings: number; // Annual
  effectiveTaxRate: number; // Percentage
  afterTaxCashFlow: number; // Annual
  taxAnalysis: string;
}

export interface RealEstateSyndicationOutputs {
  metrics: RealEstateSyndicationMetrics;
  analysis: RealEstateSyndicationAnalysis;
  cashFlowProjections: CashFlowProjection[];
  waterfallCalculations: WaterfallCalculation[];
  investorSummary: InvestorSummary;
  sponsorSummary: SponsorSummary;
  feeStructure: FeeStructure;
  taxAnalysis: TaxAnalysis;
  sensitivityAnalysis: SensitivityAnalysis;
  stressTestResults: StressTestResult[];
  syndicationSummary: string;
  recommendations: string[];
  keyMetrics: Record<string, number>;
  assumptions: Record<string, any>;
}