export interface EarthquakeInsuranceInputs {
  propertyValue: number;
  dwellingCoverage: number;
  personalPropertyCoverage: number;
  additionalLivingExpenses: number;
  deductible: number;
  propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse' | 'commercial';
  constructionType: 'wood-frame' | 'brick' | 'concrete' | 'steel' | 'mixed';
  yearBuilt: number;
  squareFootage: number;
  propertyLocation: string;
  seismicZone: 'low' | 'moderate' | 'high' | 'very-high';
  faultProximity: number;
  soilType: 'rock' | 'firm-soil' | 'soft-soil' | 'very-soft-soil';
  foundationType: 'slab' | 'crawlspace' | 'basement' | 'pier-and-beam';
  retrofitting: boolean;
  retrofittingType: 'bolting' | 'bracing' | 'anchoring' | 'reinforcing' | 'none';
  retrofittingYear: number;
  claimsHistory: number;
  creditScore: number;
  coverageOptions: {
    buildingCodeUpgrade: boolean;
    emergencyRepairs: boolean;
    debrisRemoval: boolean;
    ordinanceOrLaw: boolean;
    lossOfUse: boolean;
    businessInterruption: boolean;
    equipmentBreakdown: boolean;
    waterBackup: boolean;
    landslide: boolean;
    tsunami: boolean;
    volcanicEruption: boolean;
  };
  policyType: 'standalone' | 'endorsement' | 'comprehensive';
  policyTerm: number;
  earthquakeMagnitude: number;
  aftershockCoverage: boolean;
  waitingPeriod: number;
  coinsurance: number;
  replacementCost: boolean;
  actualCashValue: boolean;
  guaranteedReplacementCost: boolean;
  extendedReplacementCost: boolean;
  inflationGuard: boolean;
  inflationGuardPercentage: number;
  policyLimit: number;
  subLimit: number;
  premium: number;
  discount: number;
  surcharge: number;
  tax: number;
  totalCost: number;
}

export interface EarthquakeInsuranceMetrics {
  basePremium: number;
  dwellingPremium: number;
  personalPropertyPremium: number;
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
  waitingPeriodImpact: number;
  retrofittingImpact: number;
  seismicZoneImpact: number;
  constructionTypeImpact: number;
  foundationTypeImpact: number;
  soilTypeImpact: number;
  faultProximityImpact: number;
  claimsHistoryImpact: number;
  creditScoreImpact: number;
  policyTypeImpact: number;
  coverageOptionsImpact: number;
  policyLimitImpact: number;
  coinsuranceImpact: number;
  replacementCostImpact: number;
  inflationGuardImpact: number;
  earthquakeMagnitudeImpact: number;
  aftershockCoverageImpact: number;
  emergencyRepairsImpact: number;
  debrisRemovalImpact: number;
  ordinanceOrLawImpact: number;
  lossOfUseImpact: number;
  businessInterruptionImpact: number;
  equipmentBreakdownImpact: number;
  waterBackupImpact: number;
  landslideImpact: number;
  tsunamiImpact: number;
  volcanicEruptionImpact: number;
  buildingCodeUpgradeImpact: number;
  totalImpact: number;
}

export interface EarthquakeInsuranceAnalysis {
  coverageGrade: string;
  riskAssessment: string;
  recommendations: string;
  marketComparison: string;
  savingsAnalysis: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface EarthquakeInsuranceOutputs extends EarthquakeInsuranceMetrics {
  analysis: EarthquakeInsuranceAnalysis;
}
