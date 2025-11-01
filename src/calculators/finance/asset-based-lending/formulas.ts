import { AssetBasedLendingInputs, AssetBasedLendingMetrics, AssetBasedLendingAnalysis } from './types';

// Asset advance rates by type (typical ranges)
const ADVANCE_RATES = {
  accounts_receivable: { min: 0.70, max: 0.90, typical: 0.80 },
  inventory: { min: 0.40, max: 0.70, typical: 0.50 },
  equipment: { min: 0.60, max: 0.80, typical: 0.70 },
  real_estate: { min: 0.70, max: 0.90, typical: 0.75 },
  securities: { min: 0.90, max: 0.95, typical: 0.92 }
};

// Credit rating adjustments
const CREDIT_ADJUSTMENTS = {
  AAA: 1.0,
  AA: 0.95,
  A: 0.90,
  BBB: 0.85,
  BB: 0.75,
  B: 0.65,
  CCC: 0.50
};

// Industry risk factors
const INDUSTRY_RISKS: Record<string, number> = {
  technology: 0.9,
  manufacturing: 1.0,
  retail: 1.1,
  healthcare: 0.95,
  finance: 0.85,
  construction: 1.2,
  // Add more industries as needed
};

export function calculateBorrowingBase(inputs: AssetBasedLendingInputs): number {
  const { totalAssetValue, assetType, advanceRate } = inputs;

  // Use provided advance rate or default to typical rate for asset type
  const effectiveAdvanceRate = advanceRate || ADVANCE_RATES[assetType].typical;

  return totalAssetValue * effectiveAdvanceRate;
}

export function calculateMaximumLoanAmount(inputs: AssetBasedLendingInputs): number {
  const borrowingBase = calculateBorrowingBase(inputs);
  const { outstandingDebt } = inputs;

  return Math.max(0, borrowingBase - outstandingDebt);
}

export function calculateAvailableCredit(inputs: AssetBasedLendingInputs): number {
  return calculateMaximumLoanAmount(inputs);
}

export function calculateLoanToValueRatio(inputs: AssetBasedLendingInputs): number {
  const { totalAssetValue } = inputs;
  const maximumLoanAmount = calculateMaximumLoanAmount(inputs);

  if (totalAssetValue === 0) return 0;

  return (maximumLoanAmount / totalAssetValue) * 100;
}

export function calculateMonthlyPayment(inputs: AssetBasedLendingInputs): number {
  const { maximumLoanAmount, interestRate, loanTerm } = inputs;

  if (maximumLoanAmount <= 0 || loanTerm <= 0) return 0;

  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  if (monthlyRate === 0) return maximumLoanAmount / numPayments;

  return maximumLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
         (Math.pow(1 + monthlyRate, numPayments) - 1);
}

export function calculateTotalInterestPaid(inputs: AssetBasedLendingInputs): number {
  const monthlyPayment = calculateMonthlyPayment(inputs);
  const { loanTerm, maximumLoanAmount } = inputs;

  return (monthlyPayment * loanTerm * 12) - maximumLoanAmount;
}

export function calculateDebtServiceCoverageRatio(inputs: AssetBasedLendingInputs): number {
  const { monthlyRevenue, monthlyExpenses } = inputs;
  const monthlyPayment = calculateMonthlyPayment(inputs);

  const netIncome = monthlyRevenue - monthlyExpenses;

  if (monthlyPayment === 0) return Infinity;

  return netIncome / monthlyPayment;
}

export function calculateRiskRating(inputs: AssetBasedLendingInputs): number {
  const { creditRating, assetType, industry, debtServiceCoverageRatio } = inputs;

  let riskScore = 100;

  // Credit rating adjustment
  riskScore *= CREDIT_ADJUSTMENTS[creditRating];

  // Asset type risk
  const assetRisk = assetType === 'accounts_receivable' ? 0.95 :
                   assetType === 'securities' ? 0.90 :
                   assetType === 'equipment' ? 1.0 :
                   assetType === 'real_estate' ? 0.98 : 1.05;
  riskScore *= assetRisk;

  // Industry risk
  const industryRisk = INDUSTRY_RISKS[industry] || 1.0;
  riskScore *= industryRisk;

  // DSCR adjustment
  if (debtServiceCoverageRatio < 1.25) {
    riskScore *= 0.8;
  } else if (debtServiceCoverageRatio < 1.5) {
    riskScore *= 0.9;
  }

  return Math.max(0, Math.min(100, riskScore));
}

export function calculateLiquidityRatio(inputs: AssetBasedLendingInputs): number {
  const { monthlyRevenue, monthlyExpenses } = inputs;

  if (monthlyExpenses === 0) return Infinity;

  return monthlyRevenue / monthlyExpenses;
}

export function calculateCollateralCoverageRatio(inputs: AssetBasedLendingInputs): number {
  const { totalAssetValue } = inputs;
  const maximumLoanAmount = calculateMaximumLoanAmount(inputs);

  if (maximumLoanAmount === 0) return Infinity;

  return totalAssetValue / maximumLoanAmount;
}

export function calculateNetIncome(inputs: AssetBasedLendingInputs): number {
  const { monthlyRevenue, monthlyExpenses } = inputs;
  return monthlyRevenue - monthlyExpenses;
}

export function calculateCashFlowAvailable(inputs: AssetBasedLendingInputs): number {
  const netIncome = calculateNetIncome(inputs);
  const monthlyPayment = calculateMonthlyPayment(inputs);

  return Math.max(0, netIncome - monthlyPayment);
}

export function calculateResult(inputs: AssetBasedLendingInputs): number {
  return calculateMaximumLoanAmount(inputs);
}

export function generateAnalysis(inputs: AssetBasedLendingInputs, metrics: AssetBasedLendingMetrics): AssetBasedLendingAnalysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  const riskRating = calculateRiskRating(inputs);
  if (riskRating < 60) riskLevel = 'High';
  else if (riskRating < 75) riskLevel = 'Medium';

  const creditworthiness = riskRating;
  const collateralStrength = calculateCollateralCoverageRatio(inputs) > 2 ? 80 :
                           calculateCollateralCoverageRatio(inputs) > 1.5 ? 60 : 40;
  const cashFlowStability = calculateDebtServiceCoverageRatio(inputs) > 1.5 ? 80 :
                          calculateDebtServiceCoverageRatio(inputs) > 1.25 ? 60 : 40;

  let recommendation = '';
  if (creditworthiness > 75 && collateralStrength > 60 && cashFlowStability > 60) {
    recommendation = 'Strong candidate for asset-based lending. Favorable terms likely available.';
  } else if (creditworthiness > 60 || collateralStrength > 50) {
    recommendation = 'Moderate viability. May qualify with additional collateral or guarantees.';
  } else {
    recommendation = 'Limited viability for asset-based lending. Consider alternative financing options.';
  }

  return { recommendation, riskLevel, creditworthiness, collateralStrength, cashFlowStability };
}