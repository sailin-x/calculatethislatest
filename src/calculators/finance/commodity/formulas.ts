import { CommodityInputs, CommodityOutputs } from './types';

// Calculate current market value of commodity position
export function calculateCurrentValue(inputs: CommodityInputs): number {
  return inputs.currentPrice * inputs.quantity;
}

// Calculate unrealized gain/loss
export function calculateUnrealizedGainLoss(inputs: CommodityInputs): number {
  const currentValue = calculateCurrentValue(inputs);
  const costBasis = inputs.purchasePrice * inputs.quantity;
  return currentValue - costBasis;
}

// Calculate unrealized gain/loss percentage
export function calculateUnrealizedGainLossPercentage(inputs: CommodityInputs): number {
  const gainLoss = calculateUnrealizedGainLoss(inputs);
  const costBasis = inputs.purchasePrice * inputs.quantity;
  return costBasis > 0 ? (gainLoss / costBasis) * 100 : 0;
}

// Calculate total costs including transaction, storage, and insurance
export function calculateTotalCosts(inputs: CommodityInputs): number {
  const transactionCosts = inputs.transactionCosts || 0;
  const storageCosts = inputs.storageCosts || 0;
  const insuranceCosts = inputs.insuranceCosts || 0;
  return transactionCosts + storageCosts + insuranceCosts;
}

// Calculate net gain/loss after costs
export function calculateNetGainLoss(inputs: CommodityInputs): number {
  const unrealizedGainLoss = calculateUnrealizedGainLoss(inputs);
  const totalCosts = calculateTotalCosts(inputs);
  return unrealizedGainLoss - totalCosts;
}

// Calculate net gain/loss percentage
export function calculateNetGainLossPercentage(inputs: CommodityInputs): number {
  const netGainLoss = calculateNetGainLoss(inputs);
  const costBasis = inputs.purchasePrice * inputs.quantity;
  const totalCosts = calculateTotalCosts(inputs);
  const totalInvestment = costBasis + totalCosts;
  return totalInvestment > 0 ? (netGainLoss / totalInvestment) * 100 : 0;
}

// Calculate margin used for leveraged positions
export function calculateMarginUsed(inputs: CommodityInputs): number {
  const leverageRatio = inputs.leverageRatio || 1;
  if (leverageRatio <= 1) return 0;

  const positionValue = calculateCurrentValue(inputs);
  return positionValue / leverageRatio;
}

// Calculate available margin
export function calculateMarginAvailable(inputs: CommodityInputs): number {
  const marginRequirement = inputs.marginRequirement || 0;
  const marginUsed = calculateMarginUsed(inputs);
  return Math.max(0, marginRequirement - marginUsed);
}

// Calculate effective leverage ratio
export function calculateLeverageRatio(inputs: CommodityInputs): number {
  const marginUsed = calculateMarginUsed(inputs);
  return marginUsed > 0 ? (calculateCurrentValue(inputs) / marginUsed) : 1;
}

// Calculate break-even price
export function calculateBreakEvenPrice(inputs: CommodityInputs): number {
  const totalCosts = calculateTotalCosts(inputs);
  const costBasis = inputs.purchasePrice * inputs.quantity;
  const totalInvestment = costBasis + totalCosts;
  return inputs.quantity > 0 ? totalInvestment / inputs.quantity : 0;
}

// Calculate risk-reward ratio
export function calculateRiskRewardRatio(inputs: CommodityInputs): number {
  const currentValue = calculateCurrentValue(inputs);
  const breakEvenPrice = calculateBreakEvenPrice(inputs);
  const risk = Math.abs(inputs.currentPrice - breakEvenPrice);
  const reward = Math.abs(inputs.currentPrice - breakEvenPrice);

  // For commodities, risk-reward is typically based on volatility
  const volatility = inputs.marketVolatility || 0.2; // Default 20% volatility
  return volatility > 0 ? reward / risk : 0;
}

// Calculate volatility-adjusted return
export function calculateVolatilityAdjustedReturn(inputs: CommodityInputs): number {
  const annualizedReturn = calculateAnnualizedReturn(inputs);
  const volatility = inputs.marketVolatility || 0.2;
  return volatility > 0 ? annualizedReturn / volatility : 0;
}

// Calculate after-tax gain/loss
export function calculateAfterTaxGainLoss(inputs: CommodityInputs): number {
  const netGainLoss = calculateNetGainLoss(inputs);
  const taxRate = inputs.taxRate || 0.15; // Default 15% capital gains tax
  return netGainLoss * (1 - taxRate);
}

// Calculate ROI (Return on Investment)
export function calculateROI(inputs: CommodityInputs): number {
  const netGainLoss = calculateNetGainLoss(inputs);
  const costBasis = inputs.purchasePrice * inputs.quantity;
  const totalCosts = calculateTotalCosts(inputs);
  const totalInvestment = costBasis + totalCosts;
  return totalInvestment > 0 ? (netGainLoss / totalInvestment) * 100 : 0;
}

// Calculate annualized return
export function calculateAnnualizedReturn(inputs: CommodityInputs): number {
  const holdingPeriod = inputs.holdingPeriod || 1; // Default 1 year
  const roi = calculateROI(inputs);
  if (holdingPeriod <= 0) return 0;

  // Compound annual growth rate formula
  return Math.pow(1 + (roi / 100), 1 / holdingPeriod) - 1;
}

// Main commodity calculation function
export function calculateCommodity(inputs: CommodityInputs): CommodityOutputs {
  const currentValue = calculateCurrentValue(inputs);
  const unrealizedGainLoss = calculateUnrealizedGainLoss(inputs);
  const unrealizedGainLossPercentage = calculateUnrealizedGainLossPercentage(inputs);
  const totalCosts = calculateTotalCosts(inputs);
  const netGainLoss = calculateNetGainLoss(inputs);
  const netGainLossPercentage = calculateNetGainLossPercentage(inputs);
  const marginUsed = calculateMarginUsed(inputs);
  const marginAvailable = calculateMarginAvailable(inputs);
  const leverageRatio = calculateLeverageRatio(inputs);
  const breakEvenPrice = calculateBreakEvenPrice(inputs);
  const riskRewardRatio = calculateRiskRewardRatio(inputs);
  const volatilityAdjustedReturn = calculateVolatilityAdjustedReturn(inputs);
  const afterTaxGainLoss = calculateAfterTaxGainLoss(inputs);
  const roi = calculateROI(inputs);
  const annualizedReturn = calculateAnnualizedReturn(inputs);

  return {
    currentValue,
    unrealizedGainLoss,
    unrealizedGainLossPercentage,
    totalCosts,
    netGainLoss,
    netGainLossPercentage,
    marginUsed,
    marginAvailable,
    leverageRatio,
    breakEvenPrice,
    riskRewardRatio,
    volatilityAdjustedReturn,
    afterTaxGainLoss,
    roi,
    annualizedReturn
  };
}