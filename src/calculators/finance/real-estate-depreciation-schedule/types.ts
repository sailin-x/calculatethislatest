export interface RealEstateDepreciationScheduleInputs {
  propertyCost: number;
  landValue: number;
  placedInServiceDate: string;
  propertyType: 'residential' | 'commercial' | 'mixed-use';
  depreciationMethod: 'straight-line' | 'accelerated' | 'bonus';
  bonusDepreciationPercentage: number;
  section179Deduction: number;
  costSegregation: boolean;
  costSegregationAmount: number;
  costSegregationBreakdown: {
    fiveYear: number;
    sevenYear: number;
    fifteenYear: number;
    twentySevenPointFiveYear: number;
    thirtyNineYear: number;
  };
  taxYear: number;
  disposalDate?: string;
  disposalValue?: number;
  recaptureRate: number;
}

export interface RealEstateDepreciationScheduleOutputs {
  depreciableBasis: number;
  annualDepreciation: number;
  accumulatedDepreciation: number;
  remainingBasis: number;
  depreciationSchedule: {
    year: number;
    beginningBasis: number;
    depreciation: number;
    accumulatedDepreciation: number;
    endingBasis: number;
  }[];
  bonusDepreciation: {
    amount: number;
    percentage: number;
  };
  section179Deduction: {
    amount: number;
    eligible: boolean;
  };
  costSegregation: {
    totalAmount: number;
    breakdown: {
      fiveYear: number;
      sevenYear: number;
      fifteenYear: number;
      twentySevenPointFiveYear: number;
      thirtyNineYear: number;
    };
    annualDepreciation: {
      fiveYear: number;
      sevenYear: number;
      fifteenYear: number;
      twentySevenPointFiveYear: number;
      thirtyNineYear: number;
    };
  };
  taxSavings: {
    year1: number;
    year2: number;
    year3: number;
    year4: number;
    year5: number;
    total: number;
  };
  disposalAnalysis: {
    gainOrLoss: number;
    recaptureAmount: number;
    capitalGain: number;
    totalTax: number;
  };
  summary: {
    totalDepreciation: number;
    averageAnnualDepreciation: number;
    depreciationPeriod: number;
    effectiveTaxRate: number;
  };
}

export interface RealEstateDepreciationScheduleValidation {
  propertyCost: boolean;
  landValue: boolean;
  placedInServiceDate: boolean;
  propertyType: boolean;
  depreciationMethod: boolean;
  bonusDepreciationPercentage: boolean;
  section179Deduction: boolean;
  costSegregation: boolean;
  costSegregationAmount: boolean;
  costSegregationBreakdown: boolean;
  taxYear: boolean;
  disposalDate: boolean;
  disposalValue: boolean;
  recaptureRate: boolean;
}