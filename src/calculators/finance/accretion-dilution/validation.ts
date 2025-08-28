import { AccretionDilutionInputs } from './types';

export function validateAccretionDilutionInputs(inputs: AccretionDilutionInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Target Company Validation
  if (inputs.targetRevenue <= 0) {
    errors.push('Target revenue must be greater than zero');
  }
  if (inputs.targetEBITDA < 0) {
    errors.push('Target EBITDA cannot be negative');
  }
  if (inputs.targetSharesOutstanding <= 0) {
    errors.push('Target shares outstanding must be greater than zero');
  }
  if (inputs.targetSharePrice <= 0) {
    errors.push('Target share price must be greater than zero');
  }
  if (inputs.targetDebt < 0) {
    errors.push('Target debt cannot be negative');
  }
  if (inputs.targetCash < 0) {
    errors.push('Target cash cannot be negative');
  }

  // Acquirer Company Validation
  if (inputs.acquirerRevenue <= 0) {
    errors.push('Acquirer revenue must be greater than zero');
  }
  if (inputs.acquirerEBITDA < 0) {
    errors.push('Acquirer EBITDA cannot be negative');
  }
  if (inputs.acquirerSharesOutstanding <= 0) {
    errors.push('Acquirer shares outstanding must be greater than zero');
  }
  if (inputs.acquirerSharePrice <= 0) {
    errors.push('Acquirer share price must be greater than zero');
  }
  if (inputs.acquirerDebt < 0) {
    errors.push('Acquirer debt cannot be negative');
  }
  if (inputs.acquirerCash < 0) {
    errors.push('Acquirer cash cannot be negative');
  }

  // Deal Structure Validation
  if (inputs.purchasePrice <= 0) {
    errors.push('Purchase price must be greater than zero');
  }
  if (inputs.cashPortion < 0 || inputs.cashPortion > 100) {
    errors.push('Cash portion must be between 0% and 100%');
  }
  if (inputs.stockPortion < 0 || inputs.stockPortion > 100) {
    errors.push('Stock portion must be between 0% and 100%');
  }
  if (Math.abs(inputs.cashPortion + inputs.stockPortion - 100) > 0.01) {
    errors.push('Cash portion and stock portion must sum to 100%');
  }
  if (inputs.debtFinancing < 0) {
    errors.push('New debt financing cannot be negative');
  }

  // Transaction Details Validation
  if (inputs.transactionCosts < 0) {
    errors.push('Transaction costs cannot be negative');
  }
  if (inputs.integrationCosts < 0) {
    errors.push('Integration costs cannot be negative');
  }
  if (inputs.synergiesRevenue < 0) {
    errors.push('Revenue synergies cannot be negative');
  }
  if (inputs.synergiesCost < 0) {
    errors.push('Cost synergies cannot be negative');
  }
  if (inputs.synergyRampPeriod <= 0 || inputs.synergyRampPeriod > 10) {
    errors.push('Synergy ramp period must be between 1 and 10 years');
  }

  // Financing Terms Validation
  if (inputs.debtInterestRate < 0 || inputs.debtInterestRate > 25) {
    errors.push('Debt interest rate must be between 0% and 25%');
  }
  if (inputs.taxRate < 0 || inputs.taxRate > 50) {
    errors.push('Tax rate must be between 0% and 50%');
  }

  // Analysis Parameters Validation
  if (inputs.analysisYears < 3 || inputs.analysisYears > 10) {
    errors.push('Analysis period must be between 3 and 10 years');
  }
  if (inputs.discountRate < 5 || inputs.discountRate > 20) {
    errors.push('Discount rate must be between 5% and 20%');
  }
  if (inputs.terminalGrowthRate < 0 || inputs.terminalGrowthRate > 10) {
    errors.push('Terminal growth rate must be between 0% and 10%');
  }

  // Premium Analysis Validation
  if (inputs.controlPremium < 0 || inputs.controlPremium > 100) {
    errors.push('Control premium must be between 0% and 100%');
  }
  if (inputs.marketMultiple <= 0 || inputs.marketMultiple > 50) {
    errors.push('Market EV/EBITDA multiple must be between 1x and 50x');
  }

  // Optional Fields Validation
  if (inputs.revenueAttrition !== undefined && (inputs.revenueAttrition < 0 || inputs.revenueAttrition > 50)) {
    errors.push('Revenue attrition must be between 0% and 50%');
  }
  if (inputs.costInflation !== undefined && (inputs.costInflation < 0 || inputs.costInflation > 15)) {
    errors.push('Cost inflation must be between 0% and 15%');
  }
  if (inputs.industryGrowthRate !== undefined && (inputs.industryGrowthRate < -10 || inputs.industryGrowthRate > 25)) {
    errors.push('Industry growth rate must be between -10% and 25%');
  }
  if (inputs.executionRisk !== undefined && (inputs.executionRisk < 0 || inputs.executionRisk > 100)) {
    errors.push('Execution risk must be between 0% and 100%');
  }
  if (inputs.sensitivityRange !== undefined && (inputs.sensitivityRange < 5 || inputs.sensitivityRange > 50)) {
    errors.push('Sensitivity range must be between 5% and 50%');
  }
  if (inputs.regulatoryApprovalTime !== undefined && (inputs.regulatoryApprovalTime < 1 || inputs.regulatoryApprovalTime > 36)) {
    errors.push('Regulatory approval time must be between 1 and 36 months');
  }
  if (inputs.breakupFee !== undefined && inputs.breakupFee < 0) {
    errors.push('Breakup fee cannot be negative');
  }

  // Business Logic Validation
  const targetMarketCap = inputs.targetSharesOutstanding * inputs.targetSharePrice;
  if (inputs.purchasePrice < targetMarketCap * 0.8) {
    errors.push('Purchase price seems too low - should be at least 80% of current market value');
  }
  if (inputs.purchasePrice > targetMarketCap * 3) {
    errors.push('Purchase price seems excessive - over 3x current market value');
  }

  // Synergy reasonableness check
  const totalSynergies = inputs.synergiesRevenue + inputs.synergiesCost;
  if (totalSynergies > inputs.targetRevenue * 0.5) {
    errors.push('Total synergies seem excessive - over 50% of target revenue');
  }

  // Transaction costs reasonableness
  if (inputs.transactionCosts > inputs.purchasePrice * 0.1) {
    errors.push('Transaction costs seem excessive - over 10% of purchase price');
  }

  // Integration costs reasonableness
  if (inputs.integrationCosts > inputs.purchasePrice * 0.2) {
    errors.push('Integration costs seem excessive - over 20% of purchase price');
  }

  // Debt financing validation
  const totalDebt = inputs.acquirerDebt + inputs.targetDebt + inputs.debtFinancing;
  const proFormaEBITDA = inputs.acquirerEBITDA + inputs.targetEBITDA;
  if (proFormaEBITDA > 0 && totalDebt / proFormaEBITDA > 8) {
    errors.push('Pro forma leverage ratio exceeds 8x EBITDA - may be too aggressive');
  }

  // Size relationship validation
  if (inputs.targetRevenue > inputs.acquirerRevenue * 2) {
    errors.push('Target is significantly larger than acquirer - reverse merger consideration needed');
  }

  // EBITDA margin reasonableness
  const targetEBITDAMargin = inputs.targetEBITDA / inputs.targetRevenue;
  const acquirerEBITDAMargin = inputs.acquirerEBITDA / inputs.acquirerRevenue;
  if (targetEBITDAMargin > 0.5 || acquirerEBITDAMargin > 0.5) {
    errors.push('EBITDA margins over 50% seem unrealistic');
  }
  if (targetEBITDAMargin < 0 || acquirerEBITDAMargin < 0) {
    errors.push('Negative EBITDA margins indicate distressed situation');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
