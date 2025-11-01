export interface RealEstateDevelopmentProformaInputs {
  // Project basics
  projectName: string;
  projectAddress: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: 'Residential' | 'Commercial' | 'Mixed-Use' | 'Industrial';
  totalAcres: number;
  zoning: string;

  // Development timeline
  acquisitionDate: string;
  constructionStartDate: string;
  constructionEndDate: string;
  stabilizationDate: string;
  holdPeriodYears: number;

  // Land acquisition
  landAcquisitionCost: number;
  landAppraisalValue: number;
  landDueDiligenceCosts: number;
  landTransferTaxes: number;
  landClosingCosts: number;

  // Construction costs
  hardConstructionCosts: number;
  softConstructionCosts: number;
  constructionContingency: number;
  constructionInterest: number;
  constructionPeriodMonths: number;

  // Professional fees
  architectureFees: number;
  engineeringFees: number;
  legalFees: number;
  consultingFees: number;
  permitFees: number;

  // Marketing and leasing
  marketingCosts: number;
  leasingCommissions: number;
  tenantImprovementAllowance: number;
  leasingPeriodMonths: number;

  // Financing
  seniorDebtAmount: number;
  seniorDebtInterestRate: number;
  seniorDebtTermYears: number;
  mezzanineDebtAmount: number;
  mezzanineDebtInterestRate: number;
  mezzanineDebtTermYears: number;
  preferredEquityAmount: number;
  preferredEquityReturn: number;
  commonEquityAmount: number;

  // Operating costs
  propertyManagementFees: number;
  propertyTaxes: number;
  insurance: number;
  utilities: number;
  maintenance: number;
  administrativeCosts: number;

  // Revenue projections
  grossPotentialRent: number;
  vacancyRate: number;
  creditLossRate: number;
  operatingExpenseRatio: number;

  // Market assumptions
  marketRentGrowthRate: number;
  operatingExpenseGrowthRate: number;
  propertyValueAppreciationRate: number;
  exitCapRate: number;

  // Tax considerations
  depreciationMethod: 'Straight-Line' | 'Declining-Balance';
  depreciationLife: number;
  landValuePercentage: number;

  // Exit strategy
  exitStrategy: 'Sale' | 'Refinance' | 'Hold';
  targetIrr: number;
  targetEquityMultiple: number;

  // Risk factors
  constructionRisk: 'Low' | 'Medium' | 'High';
  marketRisk: 'Low' | 'Medium' | 'High';
  executionRisk: 'Low' | 'Medium' | 'High';
  regulatoryRisk: 'Low' | 'Medium' | 'High';

  // Analysis options
  includeConstructionPeriod: boolean;
  includeLeasingPeriod: boolean;
  includeStabilizationPeriod: boolean;
  includeTaxAnalysis: boolean;
  includeSensitivityAnalysis: boolean;

  // Development phases
  entitlementPeriodMonths: number;
  verticalConstructionPeriodMonths: number;
  shellConstructionPeriodMonths: number;
  interiorConstructionPeriodMonths: number;

  // Cost breakdowns
  sitePreparationCosts: number;
  foundationCosts: number;
  structuralCosts: number;
  exteriorCosts: number;
  interiorCosts: number;
  mechanicalCosts: number;
  electricalCosts: number;
  plumbingCosts: number;
  finishesCosts: number;

  // Revenue assumptions
  residentialUnits: number;
  commercialSquareFeet: number;
  averageResidentialRent: number;
  averageCommercialRent: number;
  residentialOccupancyRate: number;
  commercialOccupancyRate: number;

  // Cash flow timing
  constructionLoanInterestReserve: number;
  operatingDeficitMonths: number;
  rentCommencementLag: number;

  // Capital structure
  totalDevelopmentCost: number;
  totalCapitalization: number;
  loanToCostRatio: number;
  loanToValueRatio: number;

  // Performance metrics
  projectedNoiYear1: number;
  projectedNoiYear2: number;
  projectedNoiYear3: number;
  projectedNoiYear4: number;
  projectedNoiYear5: number;

  // Market comparables
  comparableSalePricePerUnit: number;
  comparableSalePricePerSqFt: number;
  comparableCapRate: number;
  comparableNoiPerSqFt: number;
}

export interface RealEstateDevelopmentProformaOutputs {
  // Development budget
  totalDevelopmentCost: number;
  totalCapitalRequired: number;
  equityRequired: number;
  debtRequired: number;

  // Cost breakdown
  landCostPercentage: number;
  constructionCostPercentage: number;
  professionalFeesPercentage: number;
  marketingCostPercentage: number;
  financingCostPercentage: number;

  // Revenue projections
  effectiveGrossIncome: number;
  netOperatingIncome: number;
  cashFlowBeforeDebt: number;
  cashFlowAfterDebt: number;

  // Return metrics
  internalRateOfReturn: number;
  equityMultiple: number;
  cashOnCashReturn: number;
  paybackPeriodYears: number;

  // Financial ratios
  loanToCostRatio: number;
  loanToValueRatio: number;
  debtServiceCoverageRatio: number;
  breakEvenRatio: number;

  // Value creation
  totalValueCreated: number;
  valuePerUnit: number;
  valuePerSqFt: number;
  developmentProfit: number;

  // Cash flow analysis
  year1CashFlow: number;
  year2CashFlow: number;
  year3CashFlow: number;
  year4CashFlow: number;
  year5CashFlow: number;
  cumulativeCashFlow: number;

  // Risk analysis
  riskAdjustedIrr: number;
  probabilityOfSuccess: number;
  worstCaseIrr: number;
  bestCaseIrr: number;

  // Sensitivity analysis
  irrSensitivityToRent: number;
  irrSensitivityToCost: number;
  irrSensitivityToCapRate: number;
  irrSensitivityToDelay: number;

  // Timeline analysis
  totalDevelopmentPeriod: number;
  constructionPeriodEfficiency: number;
  leasingPeriodEfficiency: number;
  timeToPositiveCashFlow: number;

  // Cost analysis
  costPerUnit: number;
  costPerSqFt: number;
  costVariancePercentage: number;
  budgetEfficiency: number;

  // Market analysis
  marketPositioning: 'Below Market' | 'At Market' | 'Above Market';
  rentPremium: number;
  absorptionRate: number;
  marketPenetration: number;

  // Tax analysis
  annualDepreciation: number;
  taxShield: number;
  afterTaxIrr: number;
  taxEfficiency: number;

  // Financing analysis
  interestExpense: number;
  debtConstant: number;
  equityIrr: number;
  blendedCostOfCapital: number;

  // Performance vs projections
  noiVariance: number;
  costVariance: number;
  timelineVariance: number;
  overallPerformance: number;

  // Benchmarking
  vsIndustryAverageIrr: number;
  vsIndustryAverageEquityMultiple: number;
  vsComparableProjects: number;
  performancePercentile: number;

  // Risk metrics
  constructionRiskScore: number;
  marketRiskScore: number;
  executionRiskScore: number;
  totalRiskScore: number;

  // Scenario analysis
  baseCaseNpv: number;
  optimisticCaseNpv: number;
  pessimisticCaseNpv: number;
  monteCarloExpectedIrr: number;

  // Development efficiency
  constructionCostPerSqFt: number;
  developmentTimeEfficiency: number;
  costControlEfficiency: number;
  overallEfficiency: number;

  // Exit analysis
  exitValue: number;
  exitCapRate: number;
  exitMultiple: number;
  holdingPeriodIrr: number;

  // Cash requirements
  maximumCashRequired: number;
  cashRunwayMonths: number;
  capitalCallsRequired: number;
  reinvestmentRequired: number;

  // Stakeholder returns
  seniorDebtIrr: number;
  mezzanineDebtIrr: number;
  preferredEquityIrr: number;
  commonEquityIrr: number;

  // Value-add opportunities
  repositioningPotential: number;
  redevelopmentPotential: number;
  expansionPotential: number;
  operationalImprovements: number;

  // Sustainability metrics
  energyEfficiencyRating: number;
  environmentalImpact: number;
  greenBuildingCertification: string;
  sustainabilityScore: number;

  // Regulatory compliance
  zoningCompliance: boolean;
  permitStatus: string;
  environmentalCompliance: boolean;
  adaCompliance: boolean;

  // Market analysis
  supplyDemandRatio: number;
  marketGrowthRate: number;
  competitivePosition: number;
  brandValue: number;

  // Operational metrics
  occupancyRate: number;
  tenantRetentionRate: number;
  operatingEfficiency: number;
  customerSatisfaction: number;

  // Financial health
  liquidityRatio: number;
  solvencyRatio: number;
  profitabilityRatio: number;
  efficiencyRatio: number;

  // Investment quality
  dealQualityScore: number;
  sponsorQualityScore: number;
  locationQualityScore: number;
  executionQualityScore: number;

  // Recommendation
  investmentRecommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  confidenceLevel: 'High' | 'Medium' | 'Low';
  keyRisks: string[];
  keyOpportunities: string[];

  // Educational content
  developmentFacts: string[];
  riskEducation: string[];
  strategyTips: string[];

  // Performance tracking
  milestoneCompletion: number;
  budgetUtilization: number;
  timelineAdherence: number;
  qualityAchievement: number;

  // Attribution analysis
  returnAttribution: {
    landAppreciation: number;
    developmentProfit: number;
    operationalIncome: number;
    financingCosts: number;
  };

  // Stress testing
  stressTestResults: {
    recessionScenario: number;
    highInterestScenario: number;
    constructionDelayScenario: number;
    lowOccupancyScenario: number;
  };

  // Alternative scenarios
  alternativeExitStrategies: {
    immediateSale: number;
    holdAndRefinance: number;
    phasedDevelopment: number;
  };

  // Portfolio impact
  portfolioDiversification: number;
  portfolioRiskReduction: number;
  portfolioReturnEnhancement: number;

  // Legacy value
  longTermAppreciation: number;
  generationalWealth: number;
  communityImpact: number;

  // Innovation metrics
  technologyIntegration: number;
  processInnovation: number;
  marketDisruption: number;

  // Stakeholder analysis
  investorSatisfaction: number;
  communityRelations: number;
  regulatoryRelations: number;
  partnerRelations: number;
}