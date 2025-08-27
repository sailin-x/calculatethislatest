export interface HomeInsuranceInputs {
  propertyValue: number;
  dwellingCoverage: number;
  personalPropertyCoverage: number;
  liabilityCoverage: number;
  additionalLivingExpenses: number;
  medicalPayments: number;
  deductible: number;
  propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse' | 'manufactured' | 'farm';
  constructionType: 'frame' | 'brick' | 'stone' | 'stucco' | 'siding' | 'log' | 'steel';
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
    identityTheft: boolean;
    waterBackup: boolean;
    equipmentBreakdown: boolean;
    jewelry: boolean;
    electronics: boolean;
    musicalInstruments: boolean;
    fineArts: boolean;
    collectibles: boolean;
  };
  safetyFeatures: {
    alarm: boolean;
    deadbolt: boolean;
    smokeDetector: boolean;
    sprinkler: boolean;
    gated: boolean;
    securityCamera: boolean;
    fireExtinguisher: boolean;
  };
  occupancyType: 'owner-occupied' | 'rental' | 'vacation' | 'vacant';
  pets: boolean;
  homeBusiness: boolean;
  swimmingPool: boolean;
  trampoline: boolean;
  woodStove: boolean;
  roofAge: number;
  electricalAge: number;
  plumbingAge: number;
  hvacAge: number;
}

export interface HomeInsuranceMetrics {
  basePremium: number;
  dwellingPremium: number;
  personalPropertyPremium: number;
  liabilityPremium: number;
  additionalCoveragePremium: number;
  discounts: number;
  totalAnnualPremium: number;
  monthlyPremium: number;
  premiumPerThousand: number;
  coverageRatio: number;
  riskScore: number;
  recommendedCoverage: number;
  coverageGap: number;
  savingsOpportunities: number;
  marketComparison: number;
}

export interface HomeInsuranceAnalysis {
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

export interface HomeInsuranceOutputs extends HomeInsuranceMetrics {
  analysis: HomeInsuranceAnalysis;
}
