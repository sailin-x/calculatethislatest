export interface RealEstateDepreciationInputs {
  propertyCost: number;
  landValue: number;
  depreciationMethod: 'straight-line' | 'declining-balance' | 'section-179' | 'bonus-depreciation';
  usefulLife: number;
  depreciationStartDate: string;
  calculationYears: number;
  salvageValue: number;
  bonusDepreciationPercentage: number;
  section179Deduction: number;
}

export interface RealEstateDepreciationResults {
  depreciableBasis: number;
  annualDepreciation: number;
  totalDepreciation: number;
  remainingBasis: number;
  depreciationSchedule: Array<{
    year: number;
    beginningBasis: number;
    depreciationExpense: number;
    accumulatedDepreciation: number;
    endingBasis: number;
    depreciationPercentage: number;
  }>;
  taxSavings: number;
  netPresentValue: number;
}