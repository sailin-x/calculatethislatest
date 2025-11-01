export interface RealEstateDepreciationScheduleInputs {
  // Property basics
  propertyName: string;
  propertyAddress: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: 'Residential' | 'Commercial' | 'Mixed-Use' | 'Industrial';

  // Acquisition details
  purchasePrice: number;
  acquisitionDate: string;
  placedInServiceDate: string;
  totalSquareFootage: number;

  // Cost allocation
  landValue: number;
  buildingValue: number;
  improvementsValue: number;
  furnitureFixturesValue: number;
  landImprovementsValue: number;

  // Depreciation methods
  buildingDepreciationMethod: 'Straight-Line' | 'Declining-Balance' | '150% Declining-Balance' | '200% Declining-Balance';
  improvementsDepreciationMethod: 'Straight-Line' | 'Declining-Balance';
  furnitureDepreciationMethod: 'Straight-Line' | 'Declining-Balance' | '150% Declining-Balance' | '200% Declining-Balance';

  // Useful lives
  buildingUsefulLife: number; // Typically 27.5 or 39 years
  improvementsUsefulLife: number;
  furnitureUsefulLife: number; // Typically 5-7 years
  landImprovementsUsefulLife: number;

  // Tax information
  taxYear: number;
  taxBracket: number; // Percentage
  stateTaxRate: number; // Percentage

  // Bonus depreciation
  bonusDepreciationPercentage: number; // 80% for 2023, etc.
  bonusDepreciationYear: number;

  // Section 179 deduction
  section179Deduction: number;
  section179PhaseOutThreshold: number;

  // Analysis options
  includeTaxSavings: boolean;
  includeCashFlowImpact: boolean;
  includeBookDepreciation: boolean;
  includeTaxDepreciation: boolean;

  // Historical data
  previousYearDepreciation: number;
  accumulatedDepreciation: number;

  // Projections
  projectionYears: number;
  inflationRate: number;
  propertyAppreciationRate: number;

  // Special situations
  qualifiedImprovementProperty: boolean;
  energyEfficientProperty: boolean;
  historicProperty: boolean;
  lowIncomeHousing: boolean;

  // Cost segregation
  costSegregationPerformed: boolean;
  personalPropertyPercentage: number;
  landImprovementsPercentage: number;

  // Refinancing impact
  refinancingOccurred: boolean;
  refinancingDate: string;
  additionalBasisFromRefinance: number;

  // Sale assumptions
  projectedSaleDate: string;
  projectedSalePrice: number;

  // Investor information
  investorType: 'Individual' | 'Partnership' | 'LLC' | 'Corporation';
  taxFilingStatus: 'Single' | 'Married Filing Jointly' | 'Married Filing Separately' | 'Head of Household';

  // Advanced options
  includeDepreciationRecapture: boolean;
  includeSection1250Property: boolean;
  includeUnrecapturedSection1250Gain: boolean;

  // Market data
  localPropertyValues: number[];
  localDepreciationRates: number[];
  comparableSalesDepreciation: number[];
}

export interface RealEstateDepreciationScheduleOutputs {
  // Depreciation calculations
  annualDepreciation: number;
  accumulatedDepreciation: number;
  remainingBasis: number;
  depreciationPercentage: number;

  // Component breakdowns
  buildingDepreciation: number;
  improvementsDepreciation: number;
  furnitureDepreciation: number;
  landImprovementsDepreciation: number;

  // Tax benefits
  taxSavings: number;
  afterTaxCashFlow: number;
  netPresentValueOfDepreciation: number;

  // Depreciation schedule
  depreciationSchedule: Array<{
    year: number;
    buildingDepreciation: number;
    improvementsDepreciation: number;
    furnitureDepreciation: number;
    totalDepreciation: number;
    accumulatedDepreciation: number;
    remainingBasis: number;
  }>;

  // Bonus depreciation
  bonusDepreciationAmount: number;
  bonusDepreciationTaxSavings: number;
  effectiveBonusDepreciation: number;

  // Section 179
  section179DeductionAmount: number;
  section179TaxSavings: number;
  section179Carryover: number;

  // Cost segregation benefits
  costSegregationSavings: number;
  acceleratedDepreciationBenefit: number;
  timeValueOfMoneySavings: number;

  // Tax implications
  depreciationRecapture: number;
  section1250Gain: number;
  unrecapturedSection1250Gain: number;
  capitalGainsTax: number;

  // Cash flow impact
  annualCashFlowImprovement: number;
  cumulativeCashFlowImprovement: number;
  paybackPeriod: number;

  // Investment metrics
  depreciationAdjustedIrr: number;
  depreciationAdjustedCashOnCash: number;
  taxEfficiencyRatio: number;

  // Comparative analysis
  vsStraightLineDepreciation: number;
  vsNoDepreciation: number;
  depreciationOptimization: number;

  // Risk analysis
  depreciationRisk: 'Low' | 'Medium' | 'High';
  recaptureRisk: number;
  auditRisk: number;

  // Strategy recommendations
  optimalDepreciationStrategy: string;
  taxPlanningRecommendations: string[];
  depreciationOptimizationTips: string[];

  // Legal considerations
  depreciationCompliance: boolean;
  irsGuidelinesAdherence: boolean;
  stateTaxImplications: string[];

  // Financial projections
  projectedDepreciation: number[];
  projectedTaxSavings: number[];
  projectedCashFlow: number[];

  // Book vs tax depreciation
  bookDepreciation: number;
  taxDepreciation: number;
  temporaryDifference: number;
  deferredTaxLiability: number;

  // Special property considerations
  qualifiedImprovementDeduction: number;
  energyEfficiencyDeduction: number;
  historicTaxCredit: number;
  lowIncomeHousingCredit: number;

  // Sale analysis
  depreciationAtSale: number;
  gainFromSale: number;
  taxableGain: number;
  depreciationRecaptureTax: number;

  // Investor-specific analysis
  individualInvestorBenefits: number;
  partnershipBenefits: number;
  corporateBenefits: number;
  taxExemptEntityBenefits: number;

  // Market analysis
  localDepreciationTrends: number[];
  comparablePropertyDepreciation: number[];
  marketDepreciationEfficiency: number;

  // Performance metrics
  depreciationUtilization: number;
  taxSavingsEfficiency: number;
  depreciationLeverage: number;

  // Educational content
  depreciationFacts: string[];
  taxStrategyTips: string[];
  commonMistakes: string[];

  // Audit preparation
  documentationRequirements: string[];
  recordRetention: number;
  auditDefenseStrategy: string[];

  // Future changes
  taxLawImpact: string[];
  depreciationReformRisk: number;
  planningRecommendations: string[];

  // Alternative strategies
  costSegregationVsStraightLine: number;
  bonusDepreciationVsStandard: number;
  section179VsBonus: number;

  // Portfolio impact
  portfolioTaxEfficiency: number;
  portfolioDepreciationDiversity: number;
  portfolioRiskMitigation: number;

  // Sustainability considerations
  greenDepreciation: number;
  energyEfficientTaxCredits: number;
  sustainablePropertyBenefits: number;

  // Technology impact
  depreciationSoftwareSavings: number;
  digitalRecordKeepingBenefits: number;
  automationEfficiency: number;

  // International considerations
  foreignInvestorImplications: string[];
  crossBorderTaxPlanning: string[];
  treatyBenefits: number;

  // Succession planning
  estatePlanningImplications: string[];
  generationalWealthTransfer: number;
  familyLimitedPartnershipBenefits: number;

  // Economic analysis
  inflationImpactOnDepreciation: number;
  economicCycleSensitivity: number;
  interestRateImpact: number;

  // Benchmarking
  industryAverageDepreciationRate: number;
  peerGroupComparison: number;
  bestPracticesAdherence: number;

  // Risk mitigation
  depreciationInsurance: number;
  taxLossHarvesting: number;
  diversificationBenefits: number;

  // Performance tracking
  depreciationGoalsAchievement: number;
  taxSavingsTargetsMet: number;
  strategyEffectiveness: number;

  // Future outlook
  depreciationTrends: string[];
  taxLawChanges: string[];
  planningHorizon: number;

  // Action items
  immediateActions: string[];
  shortTermPlanning: string[];
  longTermStrategy: string[];

  // Compliance monitoring
  depreciationScheduleAccuracy: number;
  taxReturnConsistency: number;
  regulatoryCompliance: number;

  // Value creation
  depreciationValueAdd: number;
  taxEfficiencyValue: number;
  totalEconomicBenefit: number;

  // Stakeholder impact
  investorSatisfaction: number;
  taxAdvisorValue: number;
  propertyManagerEfficiency: number;

  // Innovation opportunities
  depreciationTechnology: string[];
  processImprovements: string[];
  strategicAdvantages: string[];
}