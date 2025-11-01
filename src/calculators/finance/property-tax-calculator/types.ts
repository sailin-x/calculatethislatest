export interface PropertyTaxInputs {
  // Property details
  propertyValue: number;
  assessedValue: number;
  propertyType: 'Residential' | 'Commercial' | 'Vacant Land' | 'Agricultural' | 'Industrial';
  propertyAddress: string;
  city: string;
  state: string;
  zipCode: string;

  // Tax rates and assessment
  taxRate: number; // Mill rate or percentage
  assessmentRatio: number; // Percentage of market value used for assessment
  homesteadExemption: number;
  seniorExemption: number;
  disabilityExemption: number;
  veteranExemption: number;
  otherExemptions: number;

  // Tax calculation method
  taxCalculationMethod: 'Assessed Value' | 'Market Value' | 'Appraised Value';

  // Payment details
  paymentFrequency: 'Annual' | 'Semi-Annual' | 'Quarterly' | 'Monthly';
  paymentDueDate: string;
  lastPaymentDate: string;
  lastPaymentAmount: number;

  // Tax history
  previousYearTax: number;
  twoYearsAgoTax: number;
  threeYearsAgoTax: number;

  // Assessment details
  assessmentYear: number;
  reassessmentFrequency: number; // Years between reassessments
  lastAssessmentDate: string;

  // Special districts and overrides
  schoolDistrictTax: number;
  fireDistrictTax: number;
  libraryDistrictTax: number;
  otherDistrictTaxes: number;

  // Tax relief programs
  circuitBreakerProgram: boolean;
  propertyTaxRelief: boolean;
  taxDeferralProgram: boolean;
  abatementProgram: boolean;

  // Income and eligibility
  householdIncome: number;
  numberOfDependents: number;
  ageOfHomeowner: number;
  disabilityStatus: boolean;
  veteranStatus: boolean;

  // Market data
  averageTaxRate: number;
  medianTaxRate: number;
  localTaxRateRange: {
    low: number;
    high: number;
  };

  // Analysis options
  includeTaxReliefAnalysis: boolean;
  includeAppealAnalysis: boolean;
  includeComparisonAnalysis: boolean;
  includeProjectionAnalysis: boolean;

  // Appeal details (optional)
  appealFiled: boolean;
  appealFiledDate: string;
  appealHearingDate: string;
  appraisedValueAppeal: number;
  assessmentAppeal: number;

  // Projections
  expectedValueChange: number; // Percentage
  expectedRateChange: number; // Percentage
  projectionYears: number;

  // Tax payment history
  paymentHistory: Array<{
    date: string;
    amount: number;
    status: 'Paid' | 'Pending' | 'Overdue';
  }>;
}

export interface PropertyTaxOutputs {
  // Basic tax calculations
  annualPropertyTax: number;
  monthlyPropertyTax: number;
  quarterlyPropertyTax: number;
  semiAnnualPropertyTax: number;

  // Assessment calculations
  taxableValue: number;
  assessedValueUsed: number;
  totalExemptions: number;
  exemptionSavings: number;

  // Tax breakdown
  baseTaxAmount: number;
  schoolDistrictTaxAmount: number;
  fireDistrictTaxAmount: number;
  libraryDistrictTaxAmount: number;
  otherDistrictTaxAmount: number;

  // Tax relief and exemptions
  eligibleExemptions: string[];
  totalTaxRelief: number;
  circuitBreakerSavings: number;
  propertyTaxReliefSavings: number;
  taxDeferralAmount: number;

  // Appeal analysis
  appealPotentialSavings: number;
  appealSuccessProbability: number;
  recommendedAppealValue: number;
  appealCostBenefit: number;

  // Comparison analysis
  vsAverageTaxRate: number;
  vsMedianTaxRate: number;
  percentileRanking: number;
  localComparison: {
    lowerThan: number; // Percentage of properties with lower taxes
    higherThan: number; // Percentage of properties with higher taxes
  };

  // Tax burden analysis
  taxBurdenRatio: number; // Tax as percentage of property value
  taxBurdenCategory: 'Low' | 'Moderate' | 'High' | 'Very High';
  affordabilityIndex: number;

  // Projections
  projectedTax5Years: number;
  projectedTax10Years: number;
  projectedTaxIncrease: number;
  taxIncreaseRate: number;

  // Payment analysis
  totalPaidThisYear: number;
  remainingBalance: number;
  nextPaymentDate: string;
  nextPaymentAmount: number;

  // Savings opportunities
  potentialAnnualSavings: number;
  potentialMonthlySavings: number;
  breakEvenPeriodMonths: number;

  // Tax efficiency
  effectiveTaxRate: number;
  taxEfficiencyScore: number;
  taxOptimizationTips: string[];

  // Assessment analysis
  assessmentAccuracy: number;
  overAssessmentAmount: number;
  underAssessmentAmount: number;
  assessmentAppealRecommendation: string;

  // Market analysis
  marketTaxRate: number;
  marketComparison: 'Below Market' | 'At Market' | 'Above Market';
  marketAdjustmentNeeded: number;

  // State-specific information
  stateTaxLaws: string[];
  stateExemptions: string[];
  stateReliefPrograms: string[];

  // Local information
  localTaxAuthorities: string[];
  localAssessmentProcess: string[];
  localAppealProcess: string[];

  // Tax payment options
  paymentOptions: string[];
  paymentDeadlines: string[];
  penaltyInformation: string[];

  // Tax lien information
  lienStatus: 'None' | 'Filed' | 'Released';
  lienAmount: number;
  lienPriority: number;

  // Property tax history
  taxTrend: 'Increasing' | 'Decreasing' | 'Stable';
  averageAnnualIncrease: number;
  taxVolatility: number;

  // Recommendations
  recommendedActions: string[];
  priorityActions: string[];
  longTermStrategy: string[];

  // Risk assessment
  taxRiskLevel: 'Low' | 'Medium' | 'High';
  riskFactors: string[];
  mitigationStrategies: string[];

  // Educational content
  taxFacts: string[];
  exemptionTips: string[];
  appealTips: string[];

  // Cost analysis
  totalTaxCost: number;
  taxAsPercentageOfIncome: number;
  taxPerSquareFoot: number;
  taxPerBedroom: number;

  // Benchmarking
  neighborhoodAverageTax: number;
  cityAverageTax: number;
  stateAverageTax: number;

  // Future value impact
  taxImpactOnPropertyValue: number;
  taxEfficiencyRating: 'A' | 'B' | 'C' | 'D' | 'F';

  // Cash flow analysis
  afterTaxCashFlow: number;
  taxAdjustedROI: number;
  taxLeverageEffect: number;
}