/**
 * 1031 Exchange Calculation Formulas
 * Based on IRC Section 1031 regulations and tax code
 */

export interface Exchange1031Inputs {
  originalPropertyValue: number;
  originalBasis: number;
  replacementPropertyValue: number;
  exchangeExpenses: number;
  capitalGainsTaxRate: number;
  depreciationRecapture: number;
  bootReceived: number;
}

export interface Exchange1031Results {
  capitalGain: number;
  deferredTax: number;
  taxOnBoot: number;
  newBasis: number;
  netCashFlow: number;
  qualifiesForExchange: boolean;
  taxSavings: number;
}

/**
 * Calculate capital gain from property sale
 */
export function calculateCapitalGain(salePrice: number, adjustedBasis: number): number {
  return Math.max(0, salePrice - adjustedBasis);
}

/**
 * Calculate tax that would be owed without 1031 exchange
 */
export function calculateTaxWithoutExchange(
  capitalGain: number,
  depreciationRecapture: number,
  capitalGainsTaxRate: number
): number {
  const capitalGainsTax = (capitalGain - depreciationRecapture) * capitalGainsTaxRate;
  const depreciationRecaptureTax = depreciationRecapture * 0.25; // 25% federal rate
  return capitalGainsTax + depreciationRecaptureTax;
}

/**
 * Calculate tax on boot received in exchange
 */
export function calculateTaxOnBoot(
  bootReceived: number,
  capitalGain: number,
  taxRate: number
): number {
  const taxableGainOnBoot = Math.min(bootReceived, capitalGain);
  return taxableGainOnBoot * taxRate;
}

/**
 * Calculate new basis in replacement property
 */
export function calculateNewBasis(
  originalBasis: number,
  replacementValue: number,
  originalValue: number,
  bootReceived: number
): number {
  return originalBasis + (replacementValue - originalValue) - bootReceived;
}

/**
 * Determine if exchange qualifies for 1031 treatment
 */
export function qualifiesFor1031Exchange(
  originalValue: number,
  replacementValue: number,
  bootReceived: number
): boolean {
  // Basic qualification: replacement property value must equal or exceed
  // the value of relinquished property minus any boot received
  return replacementValue >= (originalValue - bootReceived);
}

/**
 * Calculate net cash flow impact of the exchange
 */
export function calculateNetCashFlow(
  bootReceived: number,
  exchangeExpenses: number,
  taxOnBoot: number
): number {
  return bootReceived - exchangeExpenses - taxOnBoot;
}

/**
 * Calculate total tax deferred through the exchange
 */
export function calculateDeferredTax(
  totalTaxWithoutExchange: number,
  taxOnBoot: number
): number {
  return Math.max(0, totalTaxWithoutExchange - taxOnBoot);
}

/**
 * Generate compliance recommendations
 */
export function generateRecommendations(
  inputs: Exchange1031Inputs,
  results: Exchange1031Results
): string[] {
  const recommendations: string[] = [];
  
  // Basic qualification check
  if (!results.qualifiesForExchange) {
    recommendations.push('Exchange may not qualify - replacement property value must equal or exceed relinquished property value minus boot');
  }
  
  // Boot optimization
  if (inputs.bootReceived > 0) {
    recommendations.push('Consider minimizing boot to maximize tax deferral benefits');
    
    if (inputs.bootReceived > results.capitalGain * 0.2) {
      recommendations.push('Boot exceeds 20% of capital gain - consider structuring to reduce boot');
    }
  }
  
  // Leverage optimization
  const leverageRatio = inputs.replacementPropertyValue / inputs.originalPropertyValue;
  if (leverageRatio < 1.1) {
    recommendations.push('Consider higher-value replacement property to maximize investment leverage');
  }
  
  // Cost efficiency
  const expenseRatio = inputs.exchangeExpenses / inputs.originalPropertyValue;
  if (expenseRatio > 0.03) {
    recommendations.push('Exchange expenses exceed 3% of property value - review intermediary and legal fees');
  }
  
  // Timing requirements
  recommendations.push('Ensure 45-day identification period deadline is met');
  recommendations.push('Complete exchange within 180-day completion period');
  
  // Structural requirements
  recommendations.push('Use qualified intermediary to avoid constructive receipt issues');
  recommendations.push('Ensure properties qualify as like-kind under IRC Section 1031');
  
  // Tax planning
  if (results.deferredTax > 100000) {
    recommendations.push('Consider consulting with tax advisor for large tax deferral amounts');
  }
  
  // Future planning
  if (inputs.depreciationRecapture > 0) {
    recommendations.push('Depreciation recapture is deferred but will apply to future sale of replacement property');
  }
  
  return recommendations;
}

/**
 * Validate 1031 exchange timing requirements
 */
export function validateTimingRequirements(
  saleDate: Date,
  identificationDate?: Date,
  completionDate?: Date
): {
  identificationDeadline: Date;
  completionDeadline: Date;
  identificationValid: boolean;
  completionValid: boolean;
} {
  const identificationDeadline = new Date(saleDate);
  identificationDeadline.setDate(identificationDeadline.getDate() + 45);
  
  const completionDeadline = new Date(saleDate);
  completionDeadline.setDate(completionDeadline.getDate() + 180);
  
  return {
    identificationDeadline,
    completionDeadline,
    identificationValid: !identificationDate || identificationDate <= identificationDeadline,
    completionValid: !completionDate || completionDate <= completionDeadline
  };
}

/**
 * Calculate depreciation recapture for different property types
 */
export function calculateDepreciationRecapture(
  propertyType: 'residential' | 'commercial' | 'land',
  originalCost: number,
  yearsOwned: number,
  improvementCosts: number = 0
): number {
  if (propertyType === 'land') {
    return 0; // Land is not depreciable
  }
  
  const depreciableBase = originalCost + improvementCosts;
  const depreciationPeriod = propertyType === 'residential' ? 27.5 : 39; // years
  const annualDepreciation = depreciableBase / depreciationPeriod;
  
  return Math.min(annualDepreciation * yearsOwned, depreciableBase);
}

/**
 * Calculate state tax implications
 */
export function calculateStateTaxImpact(
  capitalGain: number,
  stateTaxRate: number,
  stateAllows1031: boolean
): {
  stateTaxWithoutExchange: number;
  stateTaxWithExchange: number;
  stateTaxSavings: number;
} {
  const stateTaxWithoutExchange = capitalGain * stateTaxRate;
  const stateTaxWithExchange = stateAllows1031 ? 0 : stateTaxWithoutExchange;
  const stateTaxSavings = stateTaxWithoutExchange - stateTaxWithExchange;
  
  return {
    stateTaxWithoutExchange,
    stateTaxWithExchange,
    stateTaxSavings
  };
}

/**
 * Main calculation function
 */
export function calculate1031Exchange(inputs: Exchange1031Inputs): Exchange1031Results {
  const capitalGain = calculateCapitalGain(inputs.originalPropertyValue, inputs.originalBasis);
  
  const totalTaxWithoutExchange = calculateTaxWithoutExchange(
    capitalGain,
    inputs.depreciationRecapture,
    inputs.capitalGainsTaxRate / 100
  );
  
  const taxOnBoot = calculateTaxOnBoot(
    inputs.bootReceived,
    capitalGain,
    inputs.capitalGainsTaxRate / 100
  );
  
  const deferredTax = calculateDeferredTax(totalTaxWithoutExchange, taxOnBoot);
  
  const newBasis = calculateNewBasis(
    inputs.originalBasis,
    inputs.replacementPropertyValue,
    inputs.originalPropertyValue,
    inputs.bootReceived
  );
  
  const qualifiesForExchange = qualifiesFor1031Exchange(
    inputs.originalPropertyValue,
    inputs.replacementPropertyValue,
    inputs.bootReceived
  );
  
  const netCashFlow = calculateNetCashFlow(
    inputs.bootReceived,
    inputs.exchangeExpenses,
    taxOnBoot
  );
  
  return {
    capitalGain,
    deferredTax,
    taxOnBoot,
    newBasis,
    netCashFlow,
    qualifiesForExchange,
    taxSavings: deferredTax
  };
}