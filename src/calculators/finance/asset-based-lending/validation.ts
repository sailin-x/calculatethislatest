import { AssetBasedLendingInputs } from './types';

export function validateAssetBasedLendingInputs(inputs: AssetBasedLendingInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Total Asset Value Validation
  if (!inputs.totalAssetValue || inputs.totalAssetValue <= 0) {
    errors.push({ field: 'totalAssetValue', message: 'Total asset value must be greater than 0' });
  }
  if (inputs.totalAssetValue && inputs.totalAssetValue > 100000000) {
    errors.push({ field: 'totalAssetValue', message: 'Total asset value cannot exceed $100,000,000' });
  }

  // Asset Type Validation
  if (!inputs.assetType || !['accounts_receivable', 'inventory', 'equipment', 'real_estate', 'securities'].includes(inputs.assetType)) {
    errors.push({ field: 'assetType', message: 'Asset type must be accounts_receivable, inventory, equipment, real_estate, or securities' });
  }

  // Advance Rate Validation
  if (inputs.advanceRate < 0 || inputs.advanceRate > 1) {
    errors.push({ field: 'advanceRate', message: 'Advance rate must be between 0% and 100%' });
  }

  // Borrowing Base Validation
  if (inputs.borrowingBase < 0) {
    errors.push({ field: 'borrowingBase', message: 'Borrowing base cannot be negative' });
  }

  // Outstanding Debt Validation
  if (inputs.outstandingDebt < 0) {
    errors.push({ field: 'outstandingDebt', message: 'Outstanding debt cannot be negative' });
  }

  // Interest Rate Validation
  if (!inputs.interestRate || inputs.interestRate < 0) {
    errors.push({ field: 'interestRate', message: 'Interest rate must be 0 or greater' });
  }
  if (inputs.interestRate && inputs.interestRate > 50) {
    errors.push({ field: 'interestRate', message: 'Interest rate cannot exceed 50%' });
  }

  // Loan Term Validation
  if (!inputs.loanTerm || inputs.loanTerm < 1) {
    errors.push({ field: 'loanTerm', message: 'Loan term must be at least 1 year' });
  }
  if (inputs.loanTerm && inputs.loanTerm > 30) {
    errors.push({ field: 'loanTerm', message: 'Loan term cannot exceed 30 years' });
  }

  // Monthly Revenue Validation
  if (inputs.monthlyRevenue < 0) {
    errors.push({ field: 'monthlyRevenue', message: 'Monthly revenue cannot be negative' });
  }

  // Monthly Expenses Validation
  if (inputs.monthlyExpenses < 0) {
    errors.push({ field: 'monthlyExpenses', message: 'Monthly expenses cannot be negative' });
  }

  // Debt Service Coverage Ratio Validation
  if (inputs.debtServiceCoverageRatio < 0) {
    errors.push({ field: 'debtServiceCoverageRatio', message: 'Debt service coverage ratio cannot be negative' });
  }

  // Collateral Coverage Ratio Validation
  if (inputs.collateralCoverageRatio < 0) {
    errors.push({ field: 'collateralCoverageRatio', message: 'Collateral coverage ratio cannot be negative' });
  }

  // Industry Validation
  if (!inputs.industry || inputs.industry.trim().length === 0) {
    errors.push({ field: 'industry', message: 'Industry must be specified' });
  }

  // Credit Rating Validation
  if (!inputs.creditRating || !['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC'].includes(inputs.creditRating)) {
    errors.push({ field: 'creditRating', message: 'Credit rating must be AAA, AA, A, BBB, BB, B, or CCC' });
  }

  return errors;
}

export function validateAssetBasedLendingBusinessRules(inputs: AssetBasedLendingInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Advance Rate Warnings
  const typicalAdvanceRate = getTypicalAdvanceRate(inputs.assetType);
  if (inputs.advanceRate > typicalAdvanceRate * 1.2) {
    warnings.push({ field: 'advanceRate', message: 'Advance rate significantly above typical range for this asset type' });
  } else if (inputs.advanceRate < typicalAdvanceRate * 0.8) {
    warnings.push({ field: 'advanceRate', message: 'Advance rate below typical range may limit borrowing capacity' });
  }

  // Debt Service Coverage Ratio Warnings
  if (inputs.debtServiceCoverageRatio < 1.25) {
    warnings.push({ field: 'debtServiceCoverageRatio', message: 'DSCR below 1.25 may indicate cash flow concerns' });
  }

  // Credit Rating Warnings
  if (['BB', 'B', 'CCC'].includes(inputs.creditRating)) {
    warnings.push({ field: 'creditRating', message: 'Lower credit rating may result in higher interest rates or reduced advance rates' });
  }

  // Asset Value vs Outstanding Debt
  if (inputs.outstandingDebt > inputs.totalAssetValue * 0.8) {
    warnings.push({ field: 'outstandingDebt', message: 'High outstanding debt relative to asset value may limit new borrowing' });
  }

  // Interest Rate Warnings
  if (inputs.interestRate > 15) {
    warnings.push({ field: 'interestRate', message: 'High interest rate may indicate increased risk or market conditions' });
  }

  // Revenue vs Expenses
  if (inputs.monthlyRevenue < inputs.monthlyExpenses) {
    warnings.push({ field: 'monthlyRevenue', message: 'Negative cash flow may affect loan approval' });
  }

  // Asset Type Specific Warnings
  if (inputs.assetType === 'inventory' && inputs.advanceRate > 0.6) {
    warnings.push({ field: 'advanceRate', message: 'Inventory advance rates above 60% are uncommon and risky' });
  }

  if (inputs.assetType === 'accounts_receivable' && inputs.advanceRate > 0.85) {
    warnings.push({ field: 'advanceRate', message: 'A/R advance rates above 85% may indicate collection issues' });
  }

  // Industry Risk Warnings
  const highRiskIndustries = ['construction', 'retail'];
  if (highRiskIndustries.includes(inputs.industry.toLowerCase())) {
    warnings.push({ field: 'industry', message: 'Industry may have higher risk profile affecting loan terms' });
  }

  return warnings;
}

function getTypicalAdvanceRate(assetType: string): number {
  const rates = {
    accounts_receivable: 0.80,
    inventory: 0.50,
    equipment: 0.70,
    real_estate: 0.75,
    securities: 0.92
  };
  return rates[assetType as keyof typeof rates] || 0.70;
}