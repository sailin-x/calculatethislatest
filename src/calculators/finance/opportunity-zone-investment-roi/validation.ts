import { ValidationRuleFactory } from '../../../utils/validation';
import { OpportunityZoneInvestmentInputs } from './formulas';

export function validateOpportunityZoneInvestmentInputs(inputs: OpportunityZoneInvestmentInputs): string[] {
  const errors: string[] = [];

  // Required field validations
  const initialInvestmentRule = ValidationRuleFactory.required('initialInvestment', 'Initial Investment Amount is required');
  if (!initialInvestmentRule.validator(inputs.initialInvestment)) {
    errors.push(initialInvestmentRule.message);
  }

  const investmentDateRule = ValidationRuleFactory.required('investmentDate', 'Investment Date is required');
  if (!investmentDateRule.validator(inputs.investmentDate)) {
    errors.push(investmentDateRule.message);
  }

  const propertyValueRule = ValidationRuleFactory.required('propertyValue', 'Property Value is required');
  if (!propertyValueRule.validator(inputs.propertyValue)) {
    errors.push(propertyValueRule.message);
  }

  const annualRentalIncomeRule = ValidationRuleFactory.required('annualRentalIncome', 'Annual Rental Income is required');
  if (!annualRentalIncomeRule.validator(inputs.annualRentalIncome)) {
    errors.push(annualRentalIncomeRule.message);
  }

  const annualOperatingExpensesRule = ValidationRuleFactory.required('annualOperatingExpenses', 'Annual Operating Expenses is required');
  if (!annualOperatingExpensesRule.validator(inputs.annualOperatingExpenses)) {
    errors.push(annualOperatingExpensesRule.message);
  }

  const annualAppreciationRule = ValidationRuleFactory.required('annualAppreciation', 'Annual Appreciation Rate is required');
  if (!annualAppreciationRule.validator(inputs.annualAppreciation)) {
    errors.push(annualAppreciationRule.message);
  }

  const holdingPeriodRule = ValidationRuleFactory.required('holdingPeriod', 'Holding Period is required');
  if (!holdingPeriodRule.validator(inputs.holdingPeriod)) {
    errors.push(holdingPeriodRule.message);
  }

  const originalCapitalGainRule = ValidationRuleFactory.required('originalCapitalGain', 'Original Capital Gain Amount is required');
  if (!originalCapitalGainRule.validator(inputs.originalCapitalGain)) {
    errors.push(originalCapitalGainRule.message);
  }

  const originalGainDateRule = ValidationRuleFactory.required('originalGainDate', 'Original Gain Date is required');
  if (!originalGainDateRule.validator(inputs.originalGainDate)) {
    errors.push(originalGainDateRule.message);
  }

  const taxBracketRule = ValidationRuleFactory.required('taxBracket', 'Tax Bracket is required');
  if (!taxBracketRule.validator(inputs.taxBracket)) {
    errors.push(taxBracketRule.message);
  }

  const exitStrategyRule = ValidationRuleFactory.required('exitStrategy', 'Exit Strategy is required');
  if (!exitStrategyRule.validator(inputs.exitStrategy)) {
    errors.push(exitStrategyRule.message);
  }

  // Range validations
  if (inputs.initialInvestment !== undefined) {
    const initialInvestmentPositiveRule = ValidationRuleFactory.positive('initialInvestment', 'Initial Investment Amount must be positive');
    if (!initialInvestmentPositiveRule.validator(inputs.initialInvestment)) {
      errors.push(initialInvestmentPositiveRule.message);
    }
    
    const initialInvestmentRangeRule = ValidationRuleFactory.range('initialInvestment', 1000, 100000000, 'Initial Investment Amount must be between $1,000 and $100,000,000');
    if (!initialInvestmentRangeRule.validator(inputs.initialInvestment)) {
      errors.push(initialInvestmentRangeRule.message);
    }
  }

  if (inputs.propertyValue !== undefined) {
    const propertyValuePositiveRule = ValidationRuleFactory.positive('propertyValue', 'Property Value must be positive');
    if (!propertyValuePositiveRule.validator(inputs.propertyValue)) {
      errors.push(propertyValuePositiveRule.message);
    }
    
    const propertyValueRangeRule = ValidationRuleFactory.range('propertyValue', 1000, 100000000, 'Property Value must be between $1,000 and $100,000,000');
    if (!propertyValueRangeRule.validator(inputs.propertyValue)) {
      errors.push(propertyValueRangeRule.message);
    }
  }

  if (inputs.annualRentalIncome !== undefined) {
    const annualRentalIncomeNonNegativeRule = ValidationRuleFactory.nonNegative('annualRentalIncome', 'Annual Rental Income must be non-negative');
    if (!annualRentalIncomeNonNegativeRule.validator(inputs.annualRentalIncome)) {
      errors.push(annualRentalIncomeNonNegativeRule.message);
    }
    
    const annualRentalIncomeRangeRule = ValidationRuleFactory.range('annualRentalIncome', 0, 10000000, 'Annual Rental Income must be between $0 and $10,000,000');
    if (!annualRentalIncomeRangeRule.validator(inputs.annualRentalIncome)) {
      errors.push(annualRentalIncomeRangeRule.message);
    }
  }

  if (inputs.annualOperatingExpenses !== undefined) {
    const annualOperatingExpensesNonNegativeRule = ValidationRuleFactory.nonNegative('annualOperatingExpenses', 'Annual Operating Expenses must be non-negative');
    if (!annualOperatingExpensesNonNegativeRule.validator(inputs.annualOperatingExpenses)) {
      errors.push(annualOperatingExpensesNonNegativeRule.message);
    }
    
    const annualOperatingExpensesRangeRule = ValidationRuleFactory.range('annualOperatingExpenses', 0, 5000000, 'Annual Operating Expenses must be between $0 and $5,000,000');
    if (!annualOperatingExpensesRangeRule.validator(inputs.annualOperatingExpenses)) {
      errors.push(annualOperatingExpensesRangeRule.message);
    }
  }

  if (inputs.annualAppreciation !== undefined) {
    const annualAppreciationRangeRule = ValidationRuleFactory.range('annualAppreciation', -20, 30, 'Annual Appreciation Rate must be between -20% and 30%');
    if (!annualAppreciationRangeRule.validator(inputs.annualAppreciation)) {
      errors.push(annualAppreciationRangeRule.message);
    }
  }

  if (inputs.holdingPeriod !== undefined) {
    const holdingPeriodPositiveRule = ValidationRuleFactory.positive('holdingPeriod', 'Holding Period must be positive');
    if (!holdingPeriodPositiveRule.validator(inputs.holdingPeriod)) {
      errors.push(holdingPeriodPositiveRule.message);
    }
    
    const holdingPeriodRangeRule = ValidationRuleFactory.range('holdingPeriod', 1, 30, 'Holding Period must be between 1 and 30 years');
    if (!holdingPeriodRangeRule.validator(inputs.holdingPeriod)) {
      errors.push(holdingPeriodRangeRule.message);
    }
  }

  if (inputs.originalCapitalGain !== undefined) {
    const originalCapitalGainNonNegativeRule = ValidationRuleFactory.nonNegative('originalCapitalGain', 'Original Capital Gain Amount must be non-negative');
    if (!originalCapitalGainNonNegativeRule.validator(inputs.originalCapitalGain)) {
      errors.push(originalCapitalGainNonNegativeRule.message);
    }
    
    const originalCapitalGainRangeRule = ValidationRuleFactory.range('originalCapitalGain', 0, 100000000, 'Original Capital Gain Amount must be between $0 and $100,000,000');
    if (!originalCapitalGainRangeRule.validator(inputs.originalCapitalGain)) {
      errors.push(originalCapitalGainRangeRule.message);
    }
  }

  if (inputs.taxBracket !== undefined) {
    const taxBracketRangeRule = ValidationRuleFactory.range('taxBracket', 10, 37, 'Tax Bracket must be between 10% and 37%');
    if (!taxBracketRangeRule.validator(inputs.taxBracket)) {
      errors.push(taxBracketRangeRule.message);
    }
  }

  // Optional field validations
  if (inputs.stateTaxRate !== undefined) {
    const stateTaxRateRangeRule = ValidationRuleFactory.range('stateTaxRate', 0, 15, 'State Tax Rate must be between 0% and 15%');
    if (!stateTaxRateRangeRule.validator(inputs.stateTaxRate)) {
      errors.push(stateTaxRateRangeRule.message);
    }
  }

  if (inputs.managementFees !== undefined) {
    const managementFeesRangeRule = ValidationRuleFactory.range('managementFees', 0, 10, 'Management Fees must be between 0% and 10%');
    if (!managementFeesRangeRule.validator(inputs.managementFees)) {
      errors.push(managementFeesRangeRule.message);
    }
  }

  if (inputs.financingCosts !== undefined) {
    const financingCostsNonNegativeRule = ValidationRuleFactory.nonNegative('financingCosts', 'Financing Costs must be non-negative');
    if (!financingCostsNonNegativeRule.validator(inputs.financingCosts)) {
      errors.push(financingCostsNonNegativeRule.message);
    }
    
    const financingCostsRangeRule = ValidationRuleFactory.range('financingCosts', 0, 100000, 'Financing Costs must be between $0 and $100,000');
    if (!financingCostsRangeRule.validator(inputs.financingCosts)) {
      errors.push(financingCostsRangeRule.message);
    }
  }

  if (inputs.renovationCosts !== undefined) {
    const renovationCostsNonNegativeRule = ValidationRuleFactory.nonNegative('renovationCosts', 'Renovation Costs must be non-negative');
    if (!renovationCostsNonNegativeRule.validator(inputs.renovationCosts)) {
      errors.push(renovationCostsNonNegativeRule.message);
    }
    
    const renovationCostsRangeRule = ValidationRuleFactory.range('renovationCosts', 0, 1000000, 'Renovation Costs must be between $0 and $1,000,000');
    if (!renovationCostsRangeRule.validator(inputs.renovationCosts)) {
      errors.push(renovationCostsRangeRule.message);
    }
  }

  if (inputs.inflationRate !== undefined) {
    const inflationRateRangeRule = ValidationRuleFactory.range('inflationRate', 0, 10, 'Inflation Rate must be between 0% and 10%');
    if (!inflationRateRangeRule.validator(inputs.inflationRate)) {
      errors.push(inflationRateRangeRule.message);
    }
  }

  // Business logic validations
  if (inputs.investmentDate && inputs.originalGainDate) {
    const investmentDate = new Date(inputs.investmentDate);
    const originalGainDate = new Date(inputs.originalGainDate);
    
    if (investmentDate <= originalGainDate) {
      errors.push('Investment Date must be after Original Gain Date');
    }
    
    // Check if investment is within 180 days of gain realization
    const daysBetween = (investmentDate.getTime() - originalGainDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysBetween > 180) {
      errors.push('Investment must be made within 180 days of capital gain realization for Opportunity Zone benefits');
    }
  }

  if (inputs.initialInvestment !== undefined && inputs.originalCapitalGain !== undefined) {
    if (inputs.initialInvestment < inputs.originalCapitalGain) {
      errors.push('Initial Investment should typically be greater than or equal to the Original Capital Gain amount');
    }
  }

  if (inputs.annualRentalIncome !== undefined && inputs.annualOperatingExpenses !== undefined) {
    if (inputs.annualOperatingExpenses > inputs.annualRentalIncome * 0.8) {
      errors.push('Annual Operating Expenses seem unusually high relative to rental income');
    }
  }

  if (inputs.propertyValue !== undefined && inputs.initialInvestment !== undefined) {
    if (inputs.initialInvestment > inputs.propertyValue * 1.5) {
      errors.push('Initial Investment seems unusually high relative to property value');
    }
  }

  // Opportunity Zone specific validations
  if (inputs.holdingPeriod !== undefined) {
    if (inputs.holdingPeriod < 5) {
      errors.push('Opportunity Zone investments typically require at least 5 years to receive tax benefits');
    }
  }

  if (inputs.annualAppreciation !== undefined) {
    if (inputs.annualAppreciation < -10) {
      errors.push('Very high negative appreciation rate may indicate unrealistic assumptions');
    }
    if (inputs.annualAppreciation > 20) {
      errors.push('Very high appreciation rate may indicate unrealistic assumptions');
    }
  }

  return errors;
}