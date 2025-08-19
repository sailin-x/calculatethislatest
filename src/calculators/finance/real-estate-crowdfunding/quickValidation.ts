import { QuickValidationResult } from '../../types/QuickValidationResult';
import { RealEstateCrowdfundingInputs } from './formulas';

/**
 * Quick validate investment amount
 */
export function quickValidateInvestmentAmount(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, message: 'Investment amount must be positive', severity: 'error' };
  }
  if (value < 1000) {
    return { isValid: false, message: 'Investment amount seems too low', severity: 'warning' };
  }
  if (value > 1000000) {
    return { isValid: false, message: 'Investment amount seems too high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid investment amount', severity: 'success' };
}

/**
 * Quick validate investment term
 */
export function quickValidateInvestmentTerm(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, message: 'Investment term must be positive', severity: 'error' };
  }
  if (value < 1) {
    return { isValid: false, message: 'Investment term seems too short', severity: 'warning' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Investment term seems too long', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid investment term', severity: 'success' };
}

/**
 * Quick validate expected annual return
 */
export function quickValidateExpectedAnnualReturn(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, message: 'Expected annual return must be positive', severity: 'error' };
  }
  if (value < 5) {
    return { isValid: false, message: 'Expected return seems too low', severity: 'warning' };
  }
  if (value > 25) {
    return { isValid: false, message: 'Expected return seems too high', severity: 'warning' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Very high expected return - verify risk level', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid expected annual return', severity: 'success' };
}

/**
 * Quick validate property value
 */
export function quickValidatePropertyValue(value: number): QuickValidationResult {
  if (value <= 0) {
    return { isValid: false, message: 'Property value must be positive', severity: 'error' };
  }
  if (value < 100000) {
    return { isValid: false, message: 'Property value seems too low', severity: 'warning' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Property value seems too high', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid property value', severity: 'success' };
}

/**
 * Quick validate platform fees
 */
export function quickValidatePlatformFees(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Platform fees cannot be negative', severity: 'error' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Platform fees seem too high', severity: 'warning' };
  }
  if (value > 5) {
    return { isValid: false, message: 'High platform fees - verify competitiveness', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid platform fees', severity: 'success' };
}

/**
 * Quick validate management fees
 */
export function quickValidateManagementFees(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Management fees cannot be negative', severity: 'error' };
  }
  if (value > 5) {
    return { isValid: false, message: 'Management fees seem too high', severity: 'warning' };
  }
  if (value > 3) {
    return { isValid: false, message: 'High management fees - verify value', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid management fees', severity: 'success' };
}

/**
 * Quick validate market appreciation
 */
export function quickValidateMarketAppreciation(value: number): QuickValidationResult {
  if (value < -10) {
    return { isValid: false, message: 'Market appreciation too negative', severity: 'error' };
  }
  if (value > 15) {
    return { isValid: false, message: 'Market appreciation seems too high', severity: 'warning' };
  }
  if (value < -5) {
    return { isValid: false, message: 'Negative market appreciation - verify assumptions', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid market appreciation', severity: 'success' };
}

/**
 * Quick validate inflation rate
 */
export function quickValidateInflationRate(value: number): QuickValidationResult {
  if (value < 0) {
    return { isValid: false, message: 'Inflation rate cannot be negative', severity: 'error' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Inflation rate seems too high', severity: 'warning' };
  }
  if (value > 5) {
    return { isValid: false, message: 'High inflation rate - verify economic assumptions', severity: 'warning' };
  }
  return { isValid: true, message: 'Valid inflation rate', severity: 'success' };
}

/**
 * Quick validate investment ratio
 */
export function quickValidateInvestmentRatio(investmentAmount: number, propertyValue: number): QuickValidationResult {
  if (investmentAmount <= 0 || propertyValue <= 0) {
    return { isValid: true, message: 'Cannot calculate investment ratio', severity: 'info' };
  }
  
  const ratio = investmentAmount / propertyValue;
  
  if (ratio > 0.5) {
    return { isValid: false, message: 'Investment amount very high relative to property value', severity: 'warning' };
  }
  if (ratio < 0.001) {
    return { isValid: false, message: 'Investment amount very low relative to property value', severity: 'warning' };
  }
  if (ratio > 0.3) {
    return { isValid: false, message: 'High investment ratio - verify property value', severity: 'warning' };
  }
  
  return { isValid: true, message: `Investment ratio: ${(ratio * 100).toFixed(1)}%`, severity: 'success' };
}

/**
 * Quick validate return consistency
 */
export function quickValidateReturnConsistency(
  expectedReturn: number,
  projectType: string,
  riskLevel: string
): QuickValidationResult {
  if (projectType === 'debt' && expectedReturn > 15) {
    return { isValid: false, message: 'Debt returns typically lower than equity', severity: 'warning' };
  }
  
  if (projectType === 'equity' && expectedReturn < 8) {
    return { isValid: false, message: 'Equity returns typically higher than debt', severity: 'warning' };
  }
  
  const riskLevelReturns = {
    low: 8,
    medium_low: 10,
    medium: 12,
    medium_high: 15,
    high: 18
  };
  
  const expectedReturnForRisk = riskLevelReturns[riskLevel as keyof typeof riskLevelReturns];
  const difference = Math.abs(expectedReturn - expectedReturnForRisk);
  
  if (difference > 5) {
    return { isValid: false, message: `Return seems inconsistent with ${riskLevel.replace('_', ' ')} risk`, severity: 'warning' };
  }
  
  return { isValid: true, message: 'Return consistent with risk level', severity: 'success' };
}

/**
 * Quick validate liquidity consistency
 */
export function quickValidateLiquidityConsistency(
  liquidity: string,
  investmentTerm: number
): QuickValidationResult {
  if (liquidity === 'high' && investmentTerm > 5) {
    return { isValid: false, message: 'High liquidity investments typically shorter term', severity: 'warning' };
  }
  
  if (liquidity === 'illiquid' && investmentTerm < 3) {
    return { isValid: false, message: 'Illiquid investments typically longer term', severity: 'warning' };
  }
  
  return { isValid: true, message: 'Liquidity consistent with term', severity: 'success' };
}

/**
 * Quick validate property type consistency
 */
export function quickValidatePropertyTypeConsistency(
  propertyType: string,
  cashFlowFrequency: string,
  location: string
): QuickValidationResult {
  if (propertyType === 'land' && cashFlowFrequency !== 'exit_only') {
    return { isValid: false, message: 'Land projects typically exit-only', severity: 'warning' };
  }
  
  if (propertyType === 'land' && location === 'primary_market') {
    return { isValid: false, message: 'Land development rare in primary markets', severity: 'warning' };
  }
  
  if (propertyType === 'residential' && location === 'international') {
    return { isValid: false, message: 'International residential crowdfunding less common', severity: 'warning' };
  }
  
  return { isValid: true, message: 'Property type consistent with other factors', severity: 'success' };
}

/**
 * Quick validate all real estate crowdfunding inputs
 */
export function quickValidateAllInputs(inputs: Partial<RealEstateCrowdfundingInputs>): QuickValidationResult[] {
  const results: QuickValidationResult[] = [];

  // Investment Amount
  if (inputs.investmentAmount !== undefined) {
    results.push(quickValidateInvestmentAmount(inputs.investmentAmount));
  } else {
    results.push({ isValid: false, message: 'Investment amount is required', severity: 'error' });
  }

  // Project Type
  if (inputs.projectType !== undefined) {
    results.push({ isValid: true, message: 'Valid project type', severity: 'success' });
  } else {
    results.push({ isValid: false, message: 'Project type is required', severity: 'error' });
  }

  // Investment Term
  if (inputs.investmentTerm !== undefined) {
    results.push(quickValidateInvestmentTerm(inputs.investmentTerm));
  } else {
    results.push({ isValid: false, message: 'Investment term is required', severity: 'error' });
  }

  // Expected Annual Return
  if (inputs.expectedAnnualReturn !== undefined) {
    results.push(quickValidateExpectedAnnualReturn(inputs.expectedAnnualReturn));
  } else {
    results.push({ isValid: false, message: 'Expected annual return is required', severity: 'error' });
  }

  // Property Value
  if (inputs.propertyValue !== undefined) {
    results.push(quickValidatePropertyValue(inputs.propertyValue));
  } else {
    results.push({ isValid: false, message: 'Property value is required', severity: 'error' });
  }

  // Property Type
  if (inputs.propertyType !== undefined) {
    results.push({ isValid: true, message: 'Valid property type', severity: 'success' });
  } else {
    results.push({ isValid: false, message: 'Property type is required', severity: 'error' });
  }

  // Location
  if (inputs.location !== undefined) {
    results.push({ isValid: true, message: 'Valid location', severity: 'success' });
  } else {
    results.push({ isValid: false, message: 'Location is required', severity: 'error' });
  }

  // Platform Fees
  if (inputs.platformFees !== undefined) {
    results.push(quickValidatePlatformFees(inputs.platformFees));
  } else {
    results.push({ isValid: true, message: 'Platform fees (optional)', severity: 'info' });
  }

  // Management Fees
  if (inputs.managementFees !== undefined) {
    results.push(quickValidateManagementFees(inputs.managementFees));
  } else {
    results.push({ isValid: true, message: 'Management fees (optional)', severity: 'info' });
  }

  // Cash Flow Frequency
  if (inputs.cashFlowFrequency !== undefined) {
    results.push({ isValid: true, message: 'Valid cash flow frequency', severity: 'success' });
  } else {
    results.push({ isValid: false, message: 'Cash flow frequency is required', severity: 'error' });
  }

  // Exit Strategy
  if (inputs.exitStrategy !== undefined) {
    results.push({ isValid: true, message: 'Valid exit strategy', severity: 'success' });
  } else {
    results.push({ isValid: false, message: 'Exit strategy is required', severity: 'error' });
  }

  // Market Appreciation
  if (inputs.marketAppreciation !== undefined) {
    results.push(quickValidateMarketAppreciation(inputs.marketAppreciation));
  } else {
    results.push({ isValid: true, message: 'Market appreciation (optional)', severity: 'info' });
  }

  // Risk Level
  if (inputs.riskLevel !== undefined) {
    results.push({ isValid: true, message: 'Valid risk level', severity: 'success' });
  } else {
    results.push({ isValid: false, message: 'Risk level is required', severity: 'error' });
  }

  // Liquidity
  if (inputs.liquidity !== undefined) {
    results.push({ isValid: true, message: 'Valid liquidity', severity: 'success' });
  } else {
    results.push({ isValid: false, message: 'Liquidity is required', severity: 'error' });
  }

  // Tax Treatment
  if (inputs.taxTreatment !== undefined) {
    results.push({ isValid: true, message: 'Valid tax treatment', severity: 'success' });
  } else {
    results.push({ isValid: true, message: 'Tax treatment (optional)', severity: 'info' });
  }

  // Inflation Rate
  if (inputs.inflationRate !== undefined) {
    results.push(quickValidateInflationRate(inputs.inflationRate));
  } else {
    results.push({ isValid: true, message: 'Inflation rate (optional)', severity: 'info' });
  }

  // Calculation Type
  if (inputs.calculationType !== undefined) {
    results.push({ isValid: true, message: 'Valid calculation type', severity: 'success' });
  } else {
    results.push({ isValid: false, message: 'Calculation type is required', severity: 'error' });
  }

  // Investment Ratio
  if (inputs.investmentAmount !== undefined && inputs.propertyValue !== undefined) {
    results.push(quickValidateInvestmentRatio(inputs.investmentAmount, inputs.propertyValue));
  } else {
    results.push({ isValid: true, message: 'Investment ratio (requires amount and value)', severity: 'info' });
  }

  // Return Consistency
  if (inputs.expectedAnnualReturn !== undefined && inputs.projectType !== undefined && inputs.riskLevel !== undefined) {
    results.push(quickValidateReturnConsistency(inputs.expectedAnnualReturn, inputs.projectType, inputs.riskLevel));
  } else {
    results.push({ isValid: true, message: 'Return consistency (requires return, type, and risk)', severity: 'info' });
  }

  // Liquidity Consistency
  if (inputs.liquidity !== undefined && inputs.investmentTerm !== undefined) {
    results.push(quickValidateLiquidityConsistency(inputs.liquidity, inputs.investmentTerm));
  } else {
    results.push({ isValid: true, message: 'Liquidity consistency (requires liquidity and term)', severity: 'info' });
  }

  // Property Type Consistency
  if (inputs.propertyType !== undefined && inputs.cashFlowFrequency !== undefined && inputs.location !== undefined) {
    results.push(quickValidatePropertyTypeConsistency(inputs.propertyType, inputs.cashFlowFrequency, inputs.location));
  } else {
    results.push({ isValid: true, message: 'Property type consistency (requires type, frequency, and location)', severity: 'info' });
  }

  return results;
}