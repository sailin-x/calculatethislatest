export interface EstatePlanningInputs {
  // Personal Information
  age: number;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  numberOfChildren: number;
  numberOfGrandchildren: number;

  // Financial Assets
  totalAssets: number;
  liquidAssets: number;
  realEstateValue: number;
  retirementAccounts: number;
  businessInterests: number;

  // Annual Income
  annualIncome: number;
  annualExpenses: number;
  annualTaxes: number;

  // Estate Goals
  desiredLegacy: number;
  educationFunding: number;
  charitableGiving: number;

  // Tax Information
  federalTaxBracket: number;
  stateTaxBracket: number;
  estateTaxExemption: number;

  // Planning Horizon
  planningHorizon: number;
  expectedInflation: number;
  expectedReturn: number;

  // Risk Factors
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  lifeExpectancy: number;
  longTermCare: boolean;

  // Existing Planning
  hasWill: boolean;
  hasTrust: boolean;
  hasPowerOfAttorney: boolean;
  hasHealthcareDirective: boolean;
}

export interface EstatePlanningResults {
  // Estate Value Analysis
  currentEstateValue: number;
  projectedEstateValue: number;
  inflationAdjustedValue: number;

  // Tax Analysis
  federalEstateTax: number;
  stateEstateTax: number;
  totalEstateTax: number;
  afterTaxEstate: number;

  // Beneficiary Analysis
  perChildInheritance: number;
  perGrandchildInheritance: number;
  educationFundShortfall: number;

  // Planning Gaps
  willGap: boolean;
  trustGap: boolean;
  powerOfAttorneyGap: boolean;
  healthcareDirectiveGap: boolean;

  // Recommendations
  recommendedActions: string[];
  priorityLevel: 'low' | 'medium' | 'high' | 'urgent';
  estimatedPlanningCost: number;

  // Risk Assessment
  estateRiskScore: number;
  riskFactors: string[];
  mitigationStrategies: string[];

  // Legacy Analysis
  legacyAchievement: number;
  charitableImpact: number;
  familySecurityScore: number;

  // Financial Projections
  annualRequiredIncome: number;
  retirementShortfall: number;
  longTermCareCost: number;
}
