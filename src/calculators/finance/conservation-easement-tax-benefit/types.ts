export interface ConservationEasementTaxBenefitInputs {
  propertyValue: number;
  easementValue: number;
  propertyType: 'farmland' | 'forest' | 'wetland' | 'historic' | 'scenic' | 'wildlife' | 'mixed';
  easementType: 'permanent' | 'term' | 'rolling';
  termYears?: number;
  donorType: 'individual' | 'corporation' | 'partnership' | 'trust';
  donorTaxBracket: number;
  stateTaxRate: number;
  federalTaxRate: number;
  alternativeMinimumTax: boolean;
  carryForwardYears: number;
  propertyLocation: string;
  appraisalDate: string;
  easementDate: string;
  qualifiedConservationPurpose: boolean;
  baselineDocumentation: boolean;
  stewardshipEndowment: number;
  legalFees: number;
  appraisalFees: number;
  otherCosts: number;
}

export interface ConservationEasementTaxBenefitMetrics {
  easementDeduction: number;
  federalTaxSavings: number;
  stateTaxSavings: number;
  totalTaxSavings: number;
  netTaxBenefit: number;
  effectiveTaxRate: number;
  deductionUtilization: number;
  carryForwardAmount: number;
  annualDeductionLimit: number;
  totalDeductionPeriod: number;
  costBenefitRatio: number;
  roi: number;
  netPresentValue: number;
  internalRateOfReturn: number;
  paybackPeriod: number;
}

export interface ConservationEasementAnalysis {
  taxBenefitGrade: string;
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

export interface ConservationEasementTaxBenefitOutputs extends ConservationEasementTaxBenefitMetrics {
  analysis: ConservationEasementAnalysis;
}
