export interface HOAFeeInputs {
  monthlyFee: number;
  annualFee: number;
  propertyType: 'condo' | 'townhouse' | 'single-family' | 'multi-family';
  propertySize: number;
  amenities: string[];
  location: string;
  managementCompany: string;
  reserveFund: number;
  operatingBudget: number;
  specialAssessments: number;
  insurance: number;
  utilities: number;
  maintenance: number;
  landscaping: number;
  security: number;
  pool: boolean;
  gym: boolean;
  clubhouse: boolean;
  parking: boolean;
  elevator: boolean;
  doorman: boolean;
  concierge: boolean;
  petPolicy: string;
  rentalPolicy: string;
  ageRestrictions: boolean;
  occupancyType: 'owner-occupied' | 'rental' | 'mixed';
  totalUnits: number;
  occupancyRate: number;
  delinquencyRate: number;
  propertyValue: number;
  marketConditions: 'strong' | 'moderate' | 'weak';
  comparableFees: Array<{
    property: string;
    fee: number;
    amenities: string[];
    location: string;
  }>;
  historicalFees: Array<{
    year: number;
    fee: number;
    increase: number;
  }>;
  projectedFees: Array<{
    year: number;
    fee: number;
    increase: number;
  }>;
  budgetBreakdown: {
    administration: number;
    maintenance: number;
    utilities: number;
    insurance: number;
    landscaping: number;
    security: number;
    amenities: number;
    reserves: number;
    other: number;
  };
  financialHealth: {
    reserveRatio: number;
    operatingRatio: number;
    delinquencyRatio: number;
    assessmentRatio: number;
  };
}

export interface HOAFeeMetrics {
  monthlyFee: number;
  annualFee: number;
  feePerSquareFoot: number;
  feeToValueRatio: number;
  feeToIncomeRatio: number;
  totalCost: number;
  monthlyCost: number;
  annualCost: number;
  costBreakdown: {
    administration: number;
    maintenance: number;
    utilities: number;
    insurance: number;
    landscaping: number;
    security: number;
    amenities: number;
    reserves: number;
    other: number;
  };
  financialHealth: {
    reserveRatio: number;
    operatingRatio: number;
    delinquencyRatio: number;
    assessmentRatio: number;
  };
  marketComparison: number;
  affordabilityScore: number;
  valueScore: number;
  riskScore: number;
  recommendation: string;
  savingsOpportunities: number;
  projectedFees: Array<{
    year: number;
    fee: number;
    increase: number;
  }>;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface HOAFeeAnalysis {
  feeGrade: string;
  valueAssessment: string;
  recommendations: string;
  marketComparison: string;
  financialHealth: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface HOAFeeOutputs extends HOAFeeMetrics {
  analysis: HOAFeeAnalysis;
}
