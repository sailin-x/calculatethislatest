export interface HsaTripleTaxAdvantageCalculatorInputs {
  annualContribution: number;
  taxRate: number;
  yearsOfContributions: number;
  expectedGrowthRate: number;
  qualifiedWithdrawals: number;
  nonQualifiedWithdrawals: number;
}

export interface HsaTripleTaxAdvantageCalculatorMetrics {
  taxDeductionBenefit: number;
  taxFreeGrowth: number;
  taxFreeWithdrawals: number;
  totalTaxSavings: number;
  effectiveTaxRate: number;
}

export interface HsaTripleTaxAdvantageCalculatorAnalysis {
  tripleTaxAdvantage: string;
  comparisonToTaxable: string;
  longTermBenefits: string[];
  strategyConsiderations: string[];
}

export interface HsaTripleTaxAdvantageCalculatorOutputs {
  taxDeductionBenefit: number;
  taxFreeGrowth: number;
  taxFreeWithdrawals: number;
  totalTaxSavings: number;
  effectiveTaxRate: number;
  analysis: HsaTripleTaxAdvantageCalculatorAnalysis;
}