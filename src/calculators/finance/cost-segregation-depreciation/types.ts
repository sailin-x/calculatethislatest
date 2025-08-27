export interface CostSegregationDepreciationInputs {
  propertyValue: number;
  propertyType: 'commercial' | 'residential' | 'industrial' | 'retail' | 'office' | 'hotel' | 'warehouse' | 'mixed-use';
  constructionCost: number;
  landValue: number;
  placedInServiceDate: string;
  studyCost: number;
  propertyClass: '27.5-year' | '39-year' | '15-year' | '5-year' | '7-year' | 'mixed';
  buildingComponents: {
    hvac: number;
    electrical: number;
    plumbing: number;
    lighting: number;
    flooring: number;
    landscaping: number;
    parking: number;
    security: number;
    signage: number;
    other: number;
  };
  tenantImprovements: number;
  personalProperty: number;
  landImprovements: number;
  taxYear: number;
  bonusDepreciation: boolean;
  section179: boolean;
  taxBracket: number;
  stateTaxRate: number;
  alternativeMinimumTax: boolean;
}

export interface CostSegregationDepreciationMetrics {
  totalReclassified: number;
  buildingPortion: number;
  landImprovements: number;
  personalProperty: number;
  tenantImprovements: number;
  acceleratedDepreciation: number;
  taxSavings: number;
  netPresentValue: number;
  internalRateOfReturn: number;
  paybackPeriod: number;
  roi: number;
  annualDepreciationSchedule: Array<{
    year: number;
    building: number;
    landImprovements: number;
    personalProperty: number;
    tenantImprovements: number;
    total: number;
    taxSavings: number;
  }>;
  cumulativeTaxSavings: number;
  effectiveTaxRate: number;
  studyROI: number;
}

export interface CostSegregationAnalysis {
  benefitGrade: string;
  riskAssessment: string;
  complianceStatus: string;
  recommendations: string;
  marketComparison: string;
  sensitivityAnalysis: {
    bestCase: number;
    baseCase: number;
    worstCase: number;
  };
}

export interface CostSegregationDepreciationOutputs extends CostSegregationDepreciationMetrics {
  analysis: CostSegregationAnalysis;
}
