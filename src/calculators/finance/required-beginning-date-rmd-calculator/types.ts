export interface RequiredBeginningDateRmdInputs {
  // Personal Information
  birthDate: string;
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;

  // Account Information
  accountType: 'traditional_ira' | 'roth_ira' | '401k' | '403b' | 'sep_ira' | 'simple_ira' | 'inherited_ira';
  accountBalance: number;
  beneficiaryType: 'spouse' | 'non_spouse' | 'estate' | 'charity' | 'trust';

  // Inherited Account Information (if applicable)
  inheritedFrom: string;
  inheritanceDate: string;
  decedentBirthDate: string;
  decedentDeathDate: string;

  // Tax Information
  filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household' | 'qualifying_widow';
  marginalTaxRate: number;
  stateTaxRate: number;

  // Distribution Preferences
  distributionFrequency: 'annual' | 'quarterly' | 'monthly';
  qualifiedCharitableDistribution: boolean;
  includeSpouse: boolean;

  // Spouse Information (if applicable)
  spouseBirthDate: string;
  spouseAge: number;

  // Financial Planning
  expectedReturnRate: number;
  inflationRate: number;
  withdrawalStrategy: 'fixed_amount' | 'fixed_percentage' | 'life_expectancy' | 'required_minimum';

  // Special Circumstances
  disability: boolean;
  stillWorking: boolean;
  employerPlan: boolean;
  foreignResidence: boolean;
}

export interface RequiredBeginningDateRmdMetrics {
  // RMD Timing
  requiredBeginningDate: string;
  yearsUntilRmd: number;
  rmdAge: number;

  // RMD Amounts
  currentRmdAmount: number;
  annualRmdAmount: number;
  quarterlyRmdAmount: number;
  monthlyRmdAmount: number;

  // Account Projections
  accountBalanceAtRmd: number;
  projectedRmdSchedule: Array<{
    year: number;
    age: number;
    balance: number;
    rmdAmount: number;
    remainingBalance: number;
  }>;

  // Tax Impact
  taxOnRmd: number;
  afterTaxRmd: number;
  effectiveTaxRate: number;

  // Beneficiary Considerations
  beneficiaryDesignations: string[];
  stretchIraPotential: boolean;
  estateTaxImpact: number;

  // Planning Opportunities
  qualifiedCharitableDistributionSavings: number;
  taxBracketManagement: string;
  assetLocationOptimization: string;
}

export interface RequiredBeginningDateRmdAnalysis {
  // RMD Strategy
  recommendedStrategy: string;
  rmdPlanningApproach: string;
  timingConsiderations: string;

  // Tax Optimization
  taxOptimization: string;
  bracketManagement: string;
  stateTaxConsiderations: string;

  // Beneficiary Planning
  beneficiaryStrategy: string;
  inheritancePlanning: string;
  estatePlanningIntegration: string;

  // Financial Impact
  cashFlowImpact: string;
  investmentStrategy: string;
  withdrawalPlanning: string;

  // Risk Assessment
  longevityRisk: string;
  marketRisk: string;
  inflationRisk: string;

  // Implementation Steps
  implementationSteps: string[];
  monitoringPlan: string;
  reviewSchedule: string;

  // Alternative Strategies
  alternativeOptions: string[];
  costBenefitAnalysis: string;
  decisionFactors: string[];

  // Long-term Projections
  fiveYearProjection: string;
  tenYearProjection: string;
  twentyYearProjection: string;
}

export interface RequiredBeginningDateRmdOutputs {
  // Core Results
  requiredBeginningDate: string;
  currentRmdAmount: number;
  annualRmdAmount: number;
  yearsUntilRmd: number;

  // Analysis
  analysis: RequiredBeginningDateRmdAnalysis;

  // Additional Metrics
  accountBalanceAtRmd: number;
  taxOnRmd: number;
  afterTaxRmd: number;
  effectiveTaxRate: number;
  rmdAge: number;
  beneficiaryDesignations: string[];
  stretchIraPotential: boolean;
}