export interface PropertyTaxInputs {
  propertyValue: number;
  taxRate: number;
  exemptions?: number;
  assessmentRatio?: number;
  homesteadExemption?: number;
  seniorExemption?: number;
  disabilityExemption?: number;
  veteranExemption?: number;
  localTaxes?: number;
  specialAssessments?: number;
}

export interface PropertyTaxOutputs {
  assessedValue: number;
  taxableValue: number;
  annualPropertyTax: number;
  monthlyPropertyTax: number;
  effectiveTaxRate: number;
  totalExemptions: number;
  taxSavings: number;
  breakdown: {
    baseTax: number;
    localTaxes: number;
    specialAssessments: number;
    totalTax: number;
  };
}

export interface PropertyTaxValidation {
  propertyValue: boolean;
  taxRate: boolean;
  exemptions: boolean;
  assessmentRatio: boolean;
  homesteadExemption: boolean;
  seniorExemption: boolean;
  disabilityExemption: boolean;
  veteranExemption: boolean;
  localTaxes: boolean;
  specialAssessments: boolean;
}