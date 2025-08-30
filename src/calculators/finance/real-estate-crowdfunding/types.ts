// Real Estate Crowdfunding Calculator Types
export interface RealEstateCrowdfundingInputs {
  // Investment Information
  investmentAmount: number;
  minimumInvestment: number;
  maximumInvestment: number;
  investmentType: 'equity' | 'debt' | 'hybrid' | 'preferred_equity' | 'mezzanine';
  investmentTerm: number; // in months
  targetIRR: number;
  targetCashOnCash: number;
  targetEquityMultiple: number;

  // Property Information
  propertyValue: number;
  propertyType: 'residential' | 'commercial' | 'industrial' | 'retail' | 'office' | 'multifamily' | 'hotel' | 'land' | 'mixed_use';
  propertySize: number; // square feet
  propertyLocation: string;
  propertyCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_repair';
  propertyAge: number;
  occupancyRate: number;
  capRate: number;

  // Financial Metrics
  purchasePrice: number;
  downPayment: number;
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyRent: number;
  annualRent: number;
  operatingExpenses: number;
  propertyManagementFee: number;
  vacancyRate: number;
  maintenanceReserve: number;
  insuranceCost: number;
  propertyTaxRate: number;

  // Crowdfunding Platform Information
  platformFee: number;
  platformFeeType: 'percentage' | 'flat' | 'tiered';
  minimumHoldPeriod: number;
  liquidityOptions: 'none' | 'secondary_market' | 'buyback_program' | 'periodic_redemption';
  secondaryMarketFee: number;
  earlyExitPenalty: number;

  // Market and Economic Factors
  marketAppreciationRate: number;
  inflationRate: number;
  localEconomicGrowth: number;
  interestRateEnvironment: 'low' | 'moderate' | 'high' | 'rising' | 'falling';
  marketVolatility: 'low' | 'medium' | 'high';

  // Risk Factors
  propertyMarketRisk: 'low' | 'medium' | 'high';
  tenantCreditRisk: 'low' | 'medium' | 'high';
  interestRateRisk: 'low' | 'medium' | 'high';
  liquidityRisk: 'low' | 'medium' | 'high';
  regulatoryRisk: 'low' | 'medium' | 'high';
  sponsorTrackRecord: 'excellent' | 'good' | 'fair' | 'poor';

  // Tax Considerations
  taxBracket: number;
  stateTaxRate: number;
  localTaxRate: number;
  depreciationRecapture: boolean;
  section1031Eligible: boolean;
  qualifiedBusinessIncome: boolean;

  // Exit Strategy
  exitStrategy: 'sale' | 'refinance' | 'ipo' | 'merger' | 'hold';
  projectedExitValue: number;
  projectedExitYear: number;
  exitCosts: number;

  // Additional Investment Options
  leverageRatio: number;
  preferredReturn: number;
  promoteStructure: boolean;
  promotePercentage: number;
  waterfallStructure: 'simple' | 'complex' | 'custom';

  // Analysis Parameters
  includeTaxes: boolean;
  includeInflation: boolean;
  includeAppreciation: boolean;
  includeLiquidity: boolean;
  riskAdjustment: boolean;
  scenarioAnalysis: boolean;

  // Reporting Preferences
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  displayFormat: 'percentage' | 'decimal' | 'currency';
  includeCharts: boolean;
  includeComparisons: boolean;
  includeTimeline: boolean;
}

export interface RealEstateCrowdfundingMetrics {
  // Basic Investment Metrics
  totalInvestment: number;
  effectiveInvestment: number; // After platform fees
  investmentMultiple: number;
  totalReturn: number;
  annualizedReturn: number;

  // Cash Flow Analysis
  monthlyCashFlow: number;
  annualCashFlow: number;
  totalCashFlow: number;
  cashOnCashReturn: number;
  cashFlowYield: number;

  // Return Metrics
  irr: number;
  modifiedIRR: number;
  equityMultiple: number;
  totalReturnPercentage: number;
  annualizedReturnPercentage: number;

  // Risk Metrics
  riskAdjustedReturn: number;
  sharpeRatio: number;
  sortinoRatio: number;
  maximumDrawdown: number;
  valueAtRisk: number;
  beta: number;

  // Tax Analysis
  taxableIncome: number;
  taxLiability: number;
  afterTaxReturn: number;
  taxEfficiency: number;
  depreciationBenefit: number;

  // Liquidity Analysis
  liquidityScore: number;
  timeToLiquidity: number;
  secondaryMarketValue: number;
  earlyExitValue: number;

  // Platform Analysis
  platformFees: number;
  totalFees: number;
  netInvestment: number;
  feeImpact: number;

  // Property Performance
  propertyAppreciation: number;
  rentalGrowth: number;
  occupancyImpact: number;
  marketValueGrowth: number;
}

export interface RealEstateCrowdfundingAnalysis {
  // Investment Rating
  investmentRating: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  riskRating: 'Low' | 'Medium' | 'High';
  liquidityRating: 'High' | 'Medium' | 'Low';
  taxEfficiencyRating: 'Excellent' | 'Good' | 'Fair' | 'Poor';

  // Recommendations
  recommendation: string;
  keyStrengths: string[];
  keyWeaknesses: string[];
  optimizationSuggestions: string[];

  // Risk Assessment
  investmentRisks: string[];
  mitigationStrategies: string[];
  contingencyPlans: string[];

  // Market Analysis
  marketOutlook: string;
  marketFactors: string[];
  economicImpact: string[];
  futureProjections: string[];

  // Tax Analysis
  taxImplications: string[];
  taxOptimization: string[];
  taxRisks: string[];

  // Liquidity Analysis
  liquidityFactors: string[];
  exitOptions: string[];
  secondaryMarketAnalysis: string[];

  // Platform Analysis
  platformStrengths: string[];
  platformWeaknesses: string[];
  platformComparison: string[];

  // Action Items
  nextSteps: string[];
  timeline: string[];
  priorityActions: string[];

  // Performance Benchmarks
  performanceBenchmarks: PerformanceBenchmark[];

  // Presentation Data
  presentationPoints: string[];
  decisionFactors: string[];
  summaryPoints: string[];
}

export interface PerformanceBenchmark {
  metric: string;
  target: number;
  benchmark: number;
  industry: string;
  status: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface CashFlowProjection {
  period: number;
  date: string;
  rentalIncome: number;
  operatingExpenses: number;
  debtService: number;
  netCashFlow: number;
  cumulativeCashFlow: number;
  returnOnInvestment: number;
}

export interface ExitScenario {
  scenario: string;
  probability: number;
  exitValue: number;
  exitYear: number;
  totalReturn: number;
  irr: number;
  equityMultiple: number;
}

export interface RiskScenario {
  scenario: string;
  probability: number;
  impact: 'low' | 'medium' | 'high';
  description: string;
  mitigation: string;
}

export interface RealEstateCrowdfundingOutputs {
  // Basic Information
  investmentAmount: number;
  effectiveInvestment: number;
  investmentType: string;
  investmentTerm: number;
  propertyValue: number;
  propertyType: string;

  // Return Metrics
  totalReturn: number;
  annualizedReturn: number;
  irr: number;
  equityMultiple: number;
  cashOnCashReturn: number;

  // Risk Metrics
  riskAdjustedReturn: number;
  sharpeRatio: number;
  maximumDrawdown: number;
  valueAtRisk: number;

  // Cash Flow Analysis
  monthlyCashFlow: number;
  annualCashFlow: number;
  totalCashFlow: number;
  cashFlowYield: number;

  // Tax Analysis
  taxableIncome: number;
  taxLiability: number;
  afterTaxReturn: number;
  taxEfficiency: number;

  // Platform Analysis
  platformFees: number;
  totalFees: number;
  netInvestment: number;
  feeImpact: number;

  // Liquidity Analysis
  liquidityScore: number;
  timeToLiquidity: number;
  secondaryMarketValue: number;

  // Property Performance
  propertyAppreciation: number;
  rentalGrowth: number;
  marketValueGrowth: number;

  // Analysis Arrays
  cashFlowProjections: CashFlowProjection[];
  exitScenarios: ExitScenario[];
  riskScenarios: RiskScenario[];

  // Analysis Object
  analysis: RealEstateCrowdfundingAnalysis;

  // Additional Metrics
  investmentRating: string;
  riskRating: string;
  liquidityRating: string;
  taxEfficiencyRating: string;

  // Investment Details
  investmentMultiple: number;
  modifiedIRR: number;
  sortinoRatio: number;
  beta: number;

  // Summary
  investmentSummary: {
    totalInvestment: number;
    projectedReturn: number;
    riskLevel: string;
    liquidityLevel: string;
    recommendation: string;
  };
}