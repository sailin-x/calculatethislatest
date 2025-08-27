export interface RentersInsuranceInputs {
  personalPropertyValue: number;
  liabilityCoverage: number;
  additionalLivingExpenses: number;
  medicalPayments: number;
  deductible: number;
  propertyType: 'apartment' | 'house' | 'condo' | 'townhouse' | 'studio';
  propertyLocation: string;
  buildingAge: number;
  securityFeatures: {
    alarm: boolean;
    deadbolt: boolean;
    smokeDetector: boolean;
    sprinkler: boolean;
    gated: boolean;
  };
  coverageOptions: {
    earthquake: boolean;
    flood: boolean;
    identityTheft: boolean;
    petLiability: boolean;
    waterBackup: boolean;
    jewelry: boolean;
    electronics: boolean;
    musicalInstruments: boolean;
  };
  claimsHistory: number;
  creditScore: number;
  occupation: string;
  age: number;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  pets: boolean;
  roommates: boolean;
  homeBusiness: boolean;
  student: boolean;
  military: boolean;
}

export interface RentersInsuranceMetrics {
  basePremium: number;
  liabilityPremium: number;
  personalPropertyPremium: number;
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

export interface RentersInsuranceAnalysis {
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

export interface RentersInsuranceOutputs extends RentersInsuranceMetrics {
  analysis: RentersInsuranceAnalysis;
}
