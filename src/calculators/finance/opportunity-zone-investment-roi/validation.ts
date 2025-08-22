import { CalculatorInputs } from '../../../types/calculator';

export interface OpportunityZoneInvestmentROIInputs extends CalculatorInputs {
  // Required inputs
  initialInvestment: number;
  capitalGainsAmount: number;
  investmentPeriod: number;
  annualReturn: number;
  taxRate: number;
  
  // Optional inputs
  stateTaxRate?: number;
  propertyValue?: number;
  annualIncome?: number;
  operatingExpenses?: number;
  depreciation?: number;
  deferralPeriod?: number;
  basisStepUp?: number;
  exitStrategy?: 'sale' | 'refinance' | 'exchange' | 'hold';
  exitValue?: number;
  exitCosts?: number;
  inflationRate?: number;
  alternativeInvestmentReturn?: number;
  managementFees?: number;
  legalFees?: number;
  accountingFees?: number;
  
  // Analysis options
  includeStateTaxes?: boolean;
  includeInflation?: boolean;
  includeAlternativeComparison?: boolean;
  includeDetailedBreakdown?: boolean;
}

export const validateOpportunityZoneInvestmentROIInputs = (inputs: Partial<OpportunityZoneInvestmentROIInputs>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required field validation
  if (!inputs.initialInvestment || inputs.initialInvestment <= 0) {
    errors.push('Initial investment is required and must be greater than 0');
  }

  if (!inputs.capitalGainsAmount || inputs.capitalGainsAmount <= 0) {
    errors.push('Capital gains amount is required and must be greater than 0');
  }

  if (!inputs.investmentPeriod || inputs.investmentPeriod <= 0) {
    errors.push('Investment period is required and must be greater than 0');
  }

  if (!inputs.annualReturn || inputs.annualReturn <= 0) {
    errors.push('Annual return rate is required and must be greater than 0');
  }

  if (!inputs.taxRate || inputs.taxRate < 0) {
    errors.push('Tax rate is required and must be 0 or greater');
  }

  // Range validation
  if (inputs.initialInvestment && (inputs.initialInvestment < 10000 || inputs.initialInvestment > 100000000)) {
    errors.push('Initial investment must be between $10,000 and $100,000,000');
  }

  if (inputs.capitalGainsAmount && (inputs.capitalGainsAmount < 1000 || inputs.capitalGainsAmount > 50000000)) {
    errors.push('Capital gains amount must be between $1,000 and $50,000,000');
  }

  if (inputs.investmentPeriod && (inputs.investmentPeriod < 1 || inputs.investmentPeriod > 30)) {
    errors.push('Investment period must be between 1 and 30 years');
  }

  if (inputs.annualReturn && (inputs.annualReturn < 0 || inputs.annualReturn > 50)) {
    errors.push('Annual return rate must be between 0% and 50%');
  }

  if (inputs.taxRate && (inputs.taxRate < 0 || inputs.taxRate > 50)) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  if (inputs.stateTaxRate && (inputs.stateTaxRate < 0 || inputs.stateTaxRate > 15)) {
    errors.push('State tax rate must be between 0% and 15%');
  }

  if (inputs.propertyValue && inputs.propertyValue <= 0) {
    errors.push('Property value must be greater than 0');
  }

  if (inputs.annualIncome && inputs.annualIncome < 0) {
    errors.push('Annual income cannot be negative');
  }

  if (inputs.operatingExpenses && inputs.operatingExpenses < 0) {
    errors.push('Operating expenses cannot be negative');
  }

  if (inputs.depreciation && inputs.depreciation < 0) {
    errors.push('Depreciation cannot be negative');
  }

  if (inputs.deferralPeriod && (inputs.deferralPeriod < 1 || inputs.deferralPeriod > 10)) {
    errors.push('Deferral period must be between 1 and 10 years');
  }

  if (inputs.basisStepUp && (inputs.basisStepUp < 0 || inputs.basisStepUp > 25)) {
    errors.push('Basis step-up percentage must be between 0% and 25%');
  }

  if (inputs.exitValue && inputs.exitValue <= 0) {
    errors.push('Exit value must be greater than 0');
  }

  if (inputs.exitCosts && inputs.exitCosts < 0) {
    errors.push('Exit costs cannot be negative');
  }

  if (inputs.inflationRate && (inputs.inflationRate < -10 || inputs.inflationRate > 20)) {
    errors.push('Inflation rate must be between -10% and 20%');
  }

  if (inputs.alternativeInvestmentReturn && (inputs.alternativeInvestmentReturn < 0 || inputs.alternativeInvestmentReturn > 30)) {
    errors.push('Alternative investment return must be between 0% and 30%');
  }

  if (inputs.managementFees && inputs.managementFees < 0) {
    errors.push('Management fees cannot be negative');
  }

  if (inputs.legalFees && inputs.legalFees < 0) {
    errors.push('Legal fees cannot be negative');
  }

  if (inputs.accountingFees && inputs.accountingFees < 0) {
    errors.push('Accounting fees cannot be negative');
  }

  // Logical validation
  if (inputs.capitalGainsAmount && inputs.initialInvestment && inputs.capitalGainsAmount > inputs.initialInvestment) {
    errors.push('Capital gains amount cannot exceed initial investment');
  }

  if (inputs.annualIncome && inputs.operatingExpenses && inputs.operatingExpenses > inputs.annualIncome) {
    errors.push('Operating expenses cannot exceed annual income');
  }

  if (inputs.exitValue && inputs.exitCosts && inputs.exitCosts > inputs.exitValue) {
    errors.push('Exit costs cannot exceed exit value');
  }

  if (inputs.propertyValue && inputs.initialInvestment && inputs.propertyValue < inputs.initialInvestment * 0.5) {
    errors.push('Property value should not be less than 50% of initial investment');
  }

  if (inputs.exitValue && inputs.initialInvestment && inputs.exitValue < inputs.initialInvestment * 0.5) {
    errors.push('Exit value should not be less than 50% of initial investment');
  }

  // Tax rate validation
  if (inputs.taxRate && inputs.stateTaxRate) {
    const totalTaxRate = inputs.taxRate + inputs.stateTaxRate;
    if (totalTaxRate > 50) {
      errors.push('Combined tax rate (federal + state) cannot exceed 50%');
    }
  }

  // Investment period validation for tax benefits
  if (inputs.investmentPeriod && inputs.investmentPeriod < 5) {
    errors.push('Investment period less than 5 years may not qualify for full Opportunity Zone benefits');
  }

  if (inputs.investmentPeriod && inputs.investmentPeriod < 10) {
    errors.push('Investment period less than 10 years will not qualify for capital gains elimination');
  }

  // Return rate validation
  if (inputs.annualReturn && inputs.alternativeInvestmentReturn) {
    if (inputs.annualReturn < inputs.alternativeInvestmentReturn - 5) {
      errors.push('Opportunity Zone return should not be significantly lower than alternative investment return');
    }
  }

  // Fee validation
  if (inputs.managementFees && inputs.annualIncome) {
    const feeRatio = (inputs.managementFees / inputs.annualIncome) * 100;
    if (feeRatio > 20) {
      errors.push('Management fees should not exceed 20% of annual income');
    }
  }

  // Compliance validation
  if (inputs.capitalGainsAmount && inputs.initialInvestment) {
    const reinvestmentRatio = (inputs.capitalGainsAmount / inputs.initialInvestment) * 100;
    if (reinvestmentRatio < 50) {
      errors.push('Capital gains should represent at least 50% of initial investment for meaningful tax benefits');
    }
  }

  // Timeline validation
  if (inputs.deferralPeriod && inputs.investmentPeriod && inputs.deferralPeriod > inputs.investmentPeriod) {
    errors.push('Deferral period cannot exceed investment period');
  }

  // Basis step-up validation
  if (inputs.basisStepUp && inputs.investmentPeriod && inputs.investmentPeriod < 5) {
    errors.push('Basis step-up requires minimum 5-year holding period');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};