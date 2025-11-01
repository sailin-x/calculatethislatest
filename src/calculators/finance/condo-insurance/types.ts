export interface CondoInsuranceInputs {
  propertyValue: number;
  dwellingCoverage: number;
  personalPropertyCoverage: number;
  liabilityCoverage: number;
  lossAssessmentCoverage: number;
  additionalLivingExpenses: number;
  deductible: number;
  condoType: 'condo' | 'townhouse' | 'co-op' | 'PlannedUnitDevelopment';
  constructionType: 'frame' | 'brick' | 'stone' | 'stucco' | 'siding' | 'concrete';
  yearBuilt: number;
  squareFootage: number;
  propertyLocation: string;
  claimsHistory: number;
  creditScore: number;
  coverageOptions: {
    earthquake: boolean;
    flood: boolean;
    hurricane: boolean;
    windstorm: boolean;
    hail: boolean;
    waterBackup: boolean;
    equipmentBreakdown: boolean;
    ordinanceOrLaw: boolean;
    buildingCodeUpgrade: boolean;
    lossAssessment: boolean;
    unitImprovements: boolean;
    betterments: boolean;
    appliances: boolean;
    electronics: boolean;
    jewelry: boolean;
    fineArts: boolean;
    identityTheft: boolean;
    cyberLiability: boolean;
  };
  safetyFeatures: {
    alarm: boolean;
    deadbolt: boolean;
    smokeDetector: boolean;
    sprinkler: boolean;
    gated: boolean;
    securityCamera: boolean;
    fireExtinguisher: boolean;
    carbonMonoxideDetector: boolean;
  };
  occupancyType: 'owner-occupied' | 'rental' | 'vacation' | 'vacant';
  hoaFees: number;
  hoaInsurance: boolean;
  hoaDeductible: number;
  hoaCoverage: {
    building: boolean;
    liability: boolean;
    directorsAndOfficers: boolean;
    fidelity: boolean;
    equipment: boolean;
  };
  unitImprovements: Array<{
    improvement: string;
    cost: number;
    year: number;
    coverage: number;
  }>;
  betterments: Array<{
    betterment: string;
    cost: number;
    year: number;
    coverage: number;
  }>;
  personalProperty: Array<{
    item: string;
    value: number;
    coverage: number;
    category: string;
  }>;
  lossAssessmentHistory: Array<{
    year: number;
    amount: number;
    reason: string;
    paid: number;
  }>;
  buildingInformation: {
    totalUnits: number;
    buildingAge: number;
    buildingCondition: 'excellent' | 'good' | 'fair' | 'poor';
    buildingType: string;
    constructionQuality: string;
    amenities: string[];
  };
  hoaInformation: {
    hoaName: string;
    hoaContact: string;
    hoaPhone: string;
    hoaEmail: string;
    hoaWebsite: string;
    hoaManager: string;
    hoaManagerPhone: string;
    hoaManagerEmail: string;
    hoaBudget: number;
    hoaReserves: number;
    hoaReserveStudy: boolean;
    hoaReserveStudyDate: string;
    hoaReserveStudyNext: string;
    hoaSpecialAssessments: Array<{
      year: number;
      amount: number;
      reason: string;
      paid: number;
    }>;
  };
  marketData: {
    averageCondoValue: number;
    averageHoaFees: number;
    averageInsuranceCost: number;
    marketTrends: 'rising' | 'stable' | 'falling';
    daysOnMarket: number;
    pricePerSquareFoot: number;
  };
  comparableProperties: Array<{
    address: string;
    value: number;
    hoaFees: number;
    insuranceCost: number;
    condition: string;
    age: number;
  }>;
  riskFactors: {
    buildingRisk: number;
    hoaRisk: number;
    locationRisk: number;
    constructionRisk: number;
    occupancyRisk: number;
    claimsRisk: number;
    totalRisk: number;
  };
}

export interface CondoInsuranceMetrics {
  basePremium: number;
  dwellingPremium: number;
  personalPropertyPremium: number;
  liabilityPremium: number;
  lossAssessmentPremium: number;
  additionalCoveragePremium: number;
  discounts: number;
  surcharges: number;
  totalAnnualPremium: number;
  monthlyPremium: number;
  premiumPerThousand: number;
  coverageRatio: number;
  riskScore: number;
  recommendedCoverage: number;
  coverageGap: number;
  savingsOpportunities: number;
  marketComparison: number;
  deductibleImpact: number;
  safetyFeaturesImpact: number;
  occupancyTypeImpact: number;
  condoTypeImpact: number;
  constructionTypeImpact: number;
  claimsHistoryImpact: number;
  creditScoreImpact: number;
  coverageOptionsImpact: number;
  hoaFeesImpact: number;
  hoaInsuranceImpact: number;
  unitImprovementsImpact: number;
  bettermentsImpact: number;
  personalPropertyImpact: number;
  lossAssessmentImpact: number;
  totalImpact: number;
  cashFlowProjection: Array<{
    year: number;
    income: number;
    expenses: number;
    insurance: number;
    hoaFees: number;
    netCashFlow: number;
    cumulativeCashFlow: number;
  }>;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
  riskScore: number;
  approvalProbability: number;
  recommendedAction: string;
  alternativeScenarios: Array<{
    scenario: string;
    cost: number;
    coverage: number;
    risk: number;
    recommendation: string;
  }>;
}

export interface CondoInsuranceAnalysis {
  insuranceGrade: string;
  riskAssessment: string;
  recommendations: string;
  marketAnalysis: string;
  financialAnalysis: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface CondoInsuranceOutputs extends CondoInsuranceMetrics {
  analysis: CondoInsuranceAnalysis;
}
