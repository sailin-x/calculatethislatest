export interface FloodInsuranceInputs {
  propertyValue: number;
  buildingCoverage: number;
  contentsCoverage: number;
  deductible: number;
  propertyType: 'residential' | 'commercial' | 'industrial' | 'mixed-use';
  propertyLocation: string;
  floodZone: 'A' | 'AE' | 'AH' | 'AO' | 'AR' | 'A99' | 'V' | 'VE' | 'X' | 'B' | 'C' | 'D';
  baseFloodElevation: number;
  propertyElevation: number;
  distanceToWater: number;
  constructionType: 'frame' | 'brick' | 'stone' | 'stucco' | 'siding' | 'concrete';
  yearBuilt: number;
  squareFootage: number;
  stories: number;
  basement: boolean;
  crawlspace: boolean;
  slab: boolean;
  elevationCertificate: boolean;
  communityRatingSystem: number;
  floodHistory: Array<{
    year: number;
    damage: number;
    claim: number;
    paid: number;
  }>;
  mitigationMeasures: {
    elevation: boolean;
    floodVents: boolean;
    breakawayWalls: boolean;
    floodBarriers: boolean;
    sumpPump: boolean;
    backflowValve: boolean;
    other: boolean;
  };
  coverageOptions: {
    buildingProperty: boolean;
    personalProperty: boolean;
    otherStructures: boolean;
    lossOfUse: boolean;
    increasedCostOfCompliance: boolean;
    replacementCost: boolean;
    ordinanceOrLaw: boolean;
  };
  policyType: 'standard' | 'preferred' | 'residential' | 'commercial';
  policyTerm: number;
  claimsHistory: number;
  creditScore: number;
  occupancyType: 'owner-occupied' | 'rental' | 'vacation' | 'vacant';
  propertyUse: 'primary-residence' | 'secondary-residence' | 'rental' | 'business' | 'mixed-use';
  marketData: {
    averagePremium: number;
    medianPremium: number;
    marketTrends: 'rising' | 'stable' | 'falling';
    riskLevel: 'low' | 'medium' | 'high';
  };
  comparableProperties: Array<{
    address: string;
    value: number;
    premium: number;
    floodZone: string;
    condition: string;
  }>;
  riskFactors: {
    floodRisk: number;
    propertyRisk: number;
    locationRisk: number;
    constructionRisk: number;
    occupancyRisk: number;
    claimsRisk: number;
    totalRisk: number;
  };
}

export interface FloodInsuranceMetrics {
  basePremium: number;
  buildingPremium: number;
  contentsPremium: number;
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
  floodZoneImpact: number;
  elevationImpact: number;
  constructionTypeImpact: number;
  mitigationImpact: number;
  occupancyTypeImpact: number;
  claimsHistoryImpact: number;
  creditScoreImpact: number;
  totalImpact: number;
  cashFlowProjection: Array<{
    year: number;
    income: number;
    expenses: number;
    insurance: number;
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

export interface FloodInsuranceAnalysis {
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

export interface FloodInsuranceOutputs extends FloodInsuranceMetrics {
  analysis: FloodInsuranceAnalysis;
}
