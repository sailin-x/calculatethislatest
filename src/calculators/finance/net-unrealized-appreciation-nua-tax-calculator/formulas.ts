import { NUAInputs, NUAResults, NUAMetrics } from './types';

export function calculateNUA(inputs: NUAInputs): NUAResults {
  const {
    currentSharePrice,
    originalPurchasePrice,
    numberOfShares,
    yearsHeld,
    taxBracket,
    stateTaxRate,
    expectedGrowthRate,
    yearsToSale,
    lumpSumDistribution,
    includeStateTax,
    employerStock
  } = inputs;

  // Calculate total current value
  const totalCurrentValue = currentSharePrice * numberOfShares;

  // Calculate total cost basis
  const totalCostBasis = originalPurchasePrice * numberOfShares;

  // Calculate net unrealized appreciation
  const netUnrealizedAppreciation = totalCurrentValue - totalCostBasis;

  // Calculate capital gains tax (20% federal for NUA)
  const capitalGainsTax = netUnrealizedAppreciation * 0.20;

  // Calculate ordinary income tax on cost basis
  const ordinaryIncomeTax = totalCostBasis * (taxBracket / 100);

  // Calculate state tax if applicable
  const stateTax = includeStateTax ? (capitalGainsTax + ordinaryIncomeTax) * (stateTaxRate / 100) : 0;

  // Calculate total tax liability
  const totalTaxLiability = capitalGainsTax + ordinaryIncomeTax + stateTax;

  // Calculate after-tax value
  const afterTaxValue = totalCurrentValue - totalTaxLiability;

  // Calculate tax savings vs. ordinary income treatment
  const ordinaryIncomeTaxTotal = totalCurrentValue * (taxBracket / 100);
  const ordinaryIncomeStateTax = includeStateTax ? ordinaryIncomeTaxTotal * (stateTaxRate / 100) : 0;
  const totalOrdinaryTax = ordinaryIncomeTaxTotal + ordinaryIncomeStateTax;
  const taxSavingsVsOrdinary = totalOrdinaryTax - totalTaxLiability;

  // Calculate break-even share price
  const breakEvenSharePrice = originalPurchasePrice + (totalCostBasis * (taxBracket / 100) / numberOfShares);

  // Calculate optimal holding period
  const optimalHoldingPeriod = calculateOptimalHoldingPeriod(
    currentSharePrice,
    originalPurchasePrice,
    expectedGrowthRate,
    taxBracket
  );

  return {
    netUnrealizedAppreciation,
    capitalGainsTax,
    ordinaryIncomeTax,
    totalTaxLiability,
    afterTaxValue,
    taxSavingsVsOrdinary,
    breakEvenSharePrice,
    optimalHoldingPeriod
  };
}

function calculateOptimalHoldingPeriod(
  currentPrice: number,
  originalPrice: number,
  growthRate: number,
  taxRate: number
): number {
  // Simplified calculation - optimal when capital gains tax advantage outweighs holding costs
  const appreciation = currentPrice - originalPrice;
  const capitalGainsRate = 0.20; // 20% federal capital gains rate
  const ordinaryRate = taxRate / 100;

  if (ordinaryRate <= capitalGainsRate) {
    return 0; // Sell immediately if ordinary rate is lower
  }

  // Calculate years needed for growth to offset tax difference
  const taxDifference = ordinaryRate - capitalGainsRate;
  const requiredGrowth = (originalPrice * taxDifference) / (1 - taxDifference);

  if (requiredGrowth <= 0) return 0;

  // Calculate years using compound growth
  const years = Math.log(requiredGrowth / originalPrice) / Math.log(1 + growthRate / 100);
  return Math.max(0, Math.ceil(years));
}

export function calculateNUAMetrics(inputs: NUAInputs, results: NUAResults): NUAMetrics {
  const { currentSharePrice, originalPurchasePrice, yearsHeld, expectedGrowthRate, yearsToSale } = inputs;
  const { taxSavingsVsOrdinary, netUnrealizedAppreciation } = results;

  // Calculate NUA efficiency
  const totalValue = currentSharePrice * inputs.numberOfShares;
  const nuaEfficiency = totalValue > 0 ? (netUnrealizedAppreciation / totalValue) * 100 : 0;

  // Calculate tax optimization score
  const taxOptimizationScore = taxSavingsVsOrdinary > 0 ? Math.min(100, (taxSavingsVsOrdinary / totalValue) * 100) : 0;

  // Determine holding strategy
  let holdingStrategy: 'sell-now' | 'hold-longer' | 'lump-sum' = 'sell-now';
  if (yearsHeld >= 5 && expectedGrowthRate > 5) {
    holdingStrategy = 'hold-longer';
  } else if (yearsToSale <= 1) {
    holdingStrategy = 'lump-sum';
  }

  // Determine risk assessment
  let riskAssessment: 'low' | 'medium' | 'high' = 'low';
  if (yearsHeld < 5) riskAssessment = 'high';
  else if (yearsHeld < 10) riskAssessment = 'medium';

  return {
    nuaEfficiency,
    taxOptimizationScore,
    holdingStrategy,
    riskAssessment
  };
}

export function validateNUAInputs(inputs: NUAInputs): string[] {
  const errors: string[] = [];

  if (inputs.currentSharePrice <= 0) {
    errors.push('Current share price must be greater than $0');
  }

  if (inputs.originalPurchasePrice <= 0) {
    errors.push('Original purchase price must be greater than $0');
  }

  if (inputs.numberOfShares <= 0) {
    errors.push('Number of shares must be greater than 0');
  }

  if (inputs.yearsHeld < 0) {
    errors.push('Years held cannot be negative');
  }

  if (inputs.taxBracket < 0 || inputs.taxBracket > 50) {
    errors.push('Tax bracket must be between 0% and 50%');
  }

  if (inputs.expectedGrowthRate < -20 || inputs.expectedGrowthRate > 50) {
    errors.push('Expected growth rate must be between -20% and 50%');
  }

  if (inputs.yearsToSale < 0) {
    errors.push('Years to sale cannot be negative');
  }

  if (inputs.currentSharePrice < inputs.originalPurchasePrice) {
    errors.push('Current share price should typically be higher than original purchase price for NUA benefits');
  }

  return errors;
}