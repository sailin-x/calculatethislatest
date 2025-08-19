import { ValidationRuleFactory } from '../../../utils/validation';
import { RealEstateCrowdfundingInputs } from './formulas';

/**
 * Validate real estate crowdfunding calculator inputs
 */
export function validateRealEstateCrowdfundingInputs(inputs: Partial<RealEstateCrowdfundingInputs>): string[] {
  const errors: string[] = [];

  // Required field validations
  if (inputs.investmentAmount === undefined) {
    errors.push('Investment Amount is required');
  }

  if (inputs.projectType === undefined) {
    errors.push('Project Type is required');
  }

  if (inputs.investmentTerm === undefined) {
    errors.push('Investment Term is required');
  }

  if (inputs.expectedAnnualReturn === undefined) {
    errors.push('Expected Annual Return is required');
  }

  if (inputs.propertyValue === undefined) {
    errors.push('Property Value is required');
  }

  if (inputs.propertyType === undefined) {
    errors.push('Property Type is required');
  }

  if (inputs.location === undefined) {
    errors.push('Location is required');
  }

  if (inputs.cashFlowFrequency === undefined) {
    errors.push('Cash Flow Frequency is required');
  }

  if (inputs.exitStrategy === undefined) {
    errors.push('Exit Strategy is required');
  }

  if (inputs.riskLevel === undefined) {
    errors.push('Risk Level is required');
  }

  if (inputs.liquidity === undefined) {
    errors.push('Liquidity is required');
  }

  if (inputs.calculationType === undefined) {
    errors.push('Calculation Type is required');
  }

  // Range validations
  if (inputs.investmentAmount !== undefined) {
    const investmentAmountPositiveRule = ValidationRuleFactory.positive('investmentAmount', 'Investment Amount must be positive');
    if (!investmentAmountPositiveRule.validator(inputs.investmentAmount)) {
      errors.push(investmentAmountPositiveRule.message);
    }
    
    const investmentAmountRangeRule = ValidationRuleFactory.range('investmentAmount', 1000, 1000000, 'Investment Amount must be between $1,000 and $1,000,000');
    if (!investmentAmountRangeRule.validator(inputs.investmentAmount)) {
      errors.push(investmentAmountRangeRule.message);
    }
  }

  if (inputs.investmentTerm !== undefined) {
    const investmentTermPositiveRule = ValidationRuleFactory.positive('investmentTerm', 'Investment Term must be positive');
    if (!investmentTermPositiveRule.validator(inputs.investmentTerm)) {
      errors.push(investmentTermPositiveRule.message);
    }
    
    const investmentTermRangeRule = ValidationRuleFactory.range('investmentTerm', 1, 20, 'Investment Term must be between 1 and 20 years');
    if (!investmentTermRangeRule.validator(inputs.investmentTerm)) {
      errors.push(investmentTermRangeRule.message);
    }
  }

  if (inputs.expectedAnnualReturn !== undefined) {
    const expectedAnnualReturnPositiveRule = ValidationRuleFactory.positive('expectedAnnualReturn', 'Expected Annual Return must be positive');
    if (!expectedAnnualReturnPositiveRule.validator(inputs.expectedAnnualReturn)) {
      errors.push(expectedAnnualReturnPositiveRule.message);
    }
    
    const expectedAnnualReturnRangeRule = ValidationRuleFactory.range('expectedAnnualReturn', 5, 25, 'Expected Annual Return must be between 5% and 25%');
    if (!expectedAnnualReturnRangeRule.validator(inputs.expectedAnnualReturn)) {
      errors.push(expectedAnnualReturnRangeRule.message);
    }
  }

  if (inputs.propertyValue !== undefined) {
    const propertyValuePositiveRule = ValidationRuleFactory.positive('propertyValue', 'Property Value must be positive');
    if (!propertyValuePositiveRule.validator(inputs.propertyValue)) {
      errors.push(propertyValuePositiveRule.message);
    }
    
    const propertyValueRangeRule = ValidationRuleFactory.range('propertyValue', 100000, 10000000, 'Property Value must be between $100,000 and $10,000,000');
    if (!propertyValueRangeRule.validator(inputs.propertyValue)) {
      errors.push(propertyValueRangeRule.message);
    }
  }

  if (inputs.platformFees !== undefined) {
    const platformFeesNonNegativeRule = ValidationRuleFactory.nonNegative('platformFees', 'Platform Fees cannot be negative');
    if (!platformFeesNonNegativeRule.validator(inputs.platformFees)) {
      errors.push(platformFeesNonNegativeRule.message);
    }
    
    const platformFeesRangeRule = ValidationRuleFactory.range('platformFees', 0, 10, 'Platform Fees must be between 0% and 10%');
    if (!platformFeesRangeRule.validator(inputs.platformFees)) {
      errors.push(platformFeesRangeRule.message);
    }
  }

  if (inputs.managementFees !== undefined) {
    const managementFeesNonNegativeRule = ValidationRuleFactory.nonNegative('managementFees', 'Management Fees cannot be negative');
    if (!managementFeesNonNegativeRule.validator(inputs.managementFees)) {
      errors.push(managementFeesNonNegativeRule.message);
    }
    
    const managementFeesRangeRule = ValidationRuleFactory.range('managementFees', 0, 5, 'Management Fees must be between 0% and 5%');
    if (!managementFeesRangeRule.validator(inputs.managementFees)) {
      errors.push(managementFeesRangeRule.message);
    }
  }

  if (inputs.marketAppreciation !== undefined) {
    const marketAppreciationRangeRule = ValidationRuleFactory.range('marketAppreciation', -10, 15, 'Market Appreciation must be between -10% and 15%');
    if (!marketAppreciationRangeRule.validator(inputs.marketAppreciation)) {
      errors.push(marketAppreciationRangeRule.message);
    }
  }

  if (inputs.inflationRate !== undefined) {
    const inflationRateNonNegativeRule = ValidationRuleFactory.nonNegative('inflationRate', 'Inflation Rate cannot be negative');
    if (!inflationRateNonNegativeRule.validator(inputs.inflationRate)) {
      errors.push(inflationRateNonNegativeRule.message);
    }
    
    const inflationRateRangeRule = ValidationRuleFactory.range('inflationRate', 0, 10, 'Inflation Rate must be between 0% and 10%');
    if (!inflationRateRangeRule.validator(inputs.inflationRate)) {
      errors.push(inflationRateRangeRule.message);
    }
  }

  // Business logic validations
  if (inputs.investmentAmount !== undefined && inputs.propertyValue !== undefined) {
    const investmentRatio = inputs.investmentAmount / inputs.propertyValue;
    
    if (investmentRatio > 0.5) {
      errors.push('Investment amount seems unusually high compared to property value');
    }
    
    if (investmentRatio < 0.001) {
      errors.push('Investment amount seems unusually low compared to property value');
    }
  }

  if (inputs.expectedAnnualReturn !== undefined && inputs.riskLevel !== undefined) {
    // Validate return expectations against risk level
    const riskLevelReturns = {
      low: 8,
      medium_low: 10,
      medium: 12,
      medium_high: 15,
      high: 18
    };
    
    const expectedReturn = riskLevelReturns[inputs.riskLevel];
    const difference = Math.abs(inputs.expectedAnnualReturn - expectedReturn);
    
    if (difference > 5) {
      errors.push(`Expected return seems inconsistent with ${inputs.riskLevel.replace('_', ' ')} risk level`);
    }
  }

  if (inputs.projectType === 'debt' && inputs.expectedAnnualReturn !== undefined) {
    if (inputs.expectedAnnualReturn > 15) {
      errors.push('Debt investments typically have lower returns than equity investments');
    }
  }

  if (inputs.projectType === 'equity' && inputs.expectedAnnualReturn !== undefined) {
    if (inputs.expectedAnnualReturn < 8) {
      errors.push('Equity investments typically have higher returns than debt investments');
    }
  }

  if (inputs.location === 'international' && inputs.riskLevel === 'low') {
    errors.push('International investments are typically higher risk');
  }

  if (inputs.propertyType === 'land' && inputs.cashFlowFrequency !== 'exit_only') {
    errors.push('Land development projects typically have exit-only cash flow');
  }

  if (inputs.liquidity === 'high' && inputs.investmentTerm !== undefined && inputs.investmentTerm > 5) {
    errors.push('High liquidity investments typically have shorter terms');
  }

  if (inputs.liquidity === 'illiquid' && inputs.investmentTerm !== undefined && inputs.investmentTerm < 3) {
    errors.push('Illiquid investments typically have longer terms');
  }

  // Cross-field validations
  if (inputs.platformFees !== undefined && inputs.managementFees !== undefined) {
    const totalFees = inputs.platformFees + inputs.managementFees;
    
    if (totalFees > 8) {
      errors.push('Total fees seem unusually high');
    }
  }

  if (inputs.expectedAnnualReturn !== undefined && inputs.inflationRate !== undefined) {
    const realReturn = inputs.expectedAnnualReturn - inputs.inflationRate;
    
    if (realReturn < 2) {
      errors.push('Real return (after inflation) seems very low');
    }
  }

  // Property type and location consistency
  if (inputs.propertyType === 'land' && inputs.location === 'primary_market') {
    errors.push('Land development in primary markets is unusual');
  }

  if (inputs.propertyType === 'residential' && inputs.location === 'international') {
    errors.push('International residential crowdfunding is less common');
  }

  return errors;
}