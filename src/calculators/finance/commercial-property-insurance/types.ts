export interface CommercialPropertyInsuranceInputs {
  propertyValue: number;
  buildingValue: number;
  contentsValue: number;
  businessIncome: number;
  propertyType: 'office' | 'retail' | 'warehouse' | 'restaurant' | 'hotel' | 'medical' | 'manufacturing' | 'mixed-use';
  constructionType: 'frame' | 'joisted-masonry' | 'non-combustible' | 'masonry-non-combustible' | 'modified-fire-resistive' | 'fire-resistive';
  yearBuilt: number;
  squareFootage: number;
  location: string;
  claimsHistory: number;
  deductible: number;
  coverageLimits: {
    property: number;
    liability: number;
    businessInterruption: number;
  };
  additionalCoverages: {
    flood: boolean;
    earthquake: boolean;
    terrorism: boolean;
    cyber: boolean;
  };
}

export interface InsuranceMetrics {
  basePremium: number;
  propertyPremium: number;
  liabilityPremium: number;
  businessInterruptionPremium: number;
  additionalCoveragePremium: number;
  totalAnnualPremium: number;
  monthlyPremium: number;
  premiumPerSquareFoot: number;
  premiumToValueRatio: number;
  riskScore: number;
  coverageGap: number;
  recommendedDeductible: number;
  costSavings: number;
}

export interface InsuranceAnalysis {
  riskAssessment: string;
  coverageRecommendations: string;
  costOptimization: string;
  marketComparison: string;
}

export interface CommercialPropertyInsuranceOutputs extends InsuranceMetrics {
  analysis: InsuranceAnalysis;
}
