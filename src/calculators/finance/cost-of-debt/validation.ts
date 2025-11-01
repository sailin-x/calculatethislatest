import { CostOfDebtInputs } from './types';

export function validateCostOfDebtInputs(inputs: CostOfDebtInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Bond validation
  if (inputs.bondFaceValue && inputs.bondFaceValue <= 0) {
    errors.push({ field: 'bondFaceValue', message: 'Bond face value must be greater than 0' });
  }
  if (inputs.bondFaceValue && inputs.bondFaceValue > 10000000) {
    errors.push({ field: 'bondFaceValue', message: 'Bond face value cannot exceed $10,000,000' });
  }

  if (inputs.bondCouponRate === null || inputs.bondCouponRate === undefined || inputs.bondCouponRate < 0) {
    errors.push({ field: 'bondCouponRate', message: 'Bond coupon rate must be 0 or greater' });
  }
  if (inputs.bondCouponRate && inputs.bondCouponRate > 50) {
    errors.push({ field: 'bondCouponRate', message: 'Bond coupon rate cannot exceed 50%' });
  }

  if (inputs.bondMarketPrice && inputs.bondMarketPrice <= 0) {
    errors.push({ field: 'bondMarketPrice', message: 'Bond market price must be greater than 0' });
  }

  if (inputs.bondYearsToMaturity && inputs.bondYearsToMaturity <= 0) {
    errors.push({ field: 'bondYearsToMaturity', message: 'Bond years to maturity must be greater than 0' });
  }
  if (inputs.bondYearsToMaturity && inputs.bondYearsToMaturity > 100) {
    errors.push({ field: 'bondYearsToMaturity', message: 'Bond years to maturity cannot exceed 100 years' });
  }

  if (inputs.bondCouponFrequency && (inputs.bondCouponFrequency < 1 || inputs.bondCouponFrequency > 12)) {
    errors.push({ field: 'bondCouponFrequency', message: 'Bond coupon frequency must be between 1 and 12' });
  }

  // Bank loan validation
  if (inputs.bankLoanAmount && inputs.bankLoanAmount <= 0) {
    errors.push({ field: 'bankLoanAmount', message: 'Bank loan amount must be greater than 0' });
  }

  if (inputs.bankLoanInterestRate === null || inputs.bankLoanInterestRate === undefined || inputs.bankLoanInterestRate < 0) {
    errors.push({ field: 'bankLoanInterestRate', message: 'Bank loan interest rate must be 0 or greater' });
  }
  if (inputs.bankLoanInterestRate && inputs.bankLoanInterestRate > 50) {
    errors.push({ field: 'bankLoanInterestRate', message: 'Bank loan interest rate cannot exceed 50%' });
  }

  if (inputs.bankLoanTerm && inputs.bankLoanTerm <= 0) {
    errors.push({ field: 'bankLoanTerm', message: 'Bank loan term must be greater than 0' });
  }

  if (inputs.bankLoanFees && inputs.bankLoanFees < 0) {
    errors.push({ field: 'bankLoanFees', message: 'Bank loan fees cannot be negative' });
  }

  // Credit facility validation
  if (inputs.creditFacilityLimit && inputs.creditFacilityLimit <= 0) {
    errors.push({ field: 'creditFacilityLimit', message: 'Credit facility limit must be greater than 0' });
  }

  if (inputs.creditFacilityRate === null || inputs.creditFacilityRate === undefined || inputs.creditFacilityRate < 0) {
    errors.push({ field: 'creditFacilityRate', message: 'Credit facility rate must be 0 or greater' });
  }

  if (inputs.creditFacilityCommitmentFee && inputs.creditFacilityCommitmentFee < 0) {
    errors.push({ field: 'creditFacilityCommitmentFee', message: 'Credit facility commitment fee cannot be negative' });
  }

  if (inputs.creditFacilityUtilization && (inputs.creditFacilityUtilization < 0 || inputs.creditFacilityUtilization > 100)) {
    errors.push({ field: 'creditFacilityUtilization', message: 'Credit facility utilization must be between 0 and 100' });
  }

  // Preferred stock validation
  if (inputs.preferredStockDividend && inputs.preferredStockDividend < 0) {
    errors.push({ field: 'preferredStockDividend', message: 'Preferred stock dividend cannot be negative' });
  }

  if (inputs.preferredStockPrice && inputs.preferredStockPrice <= 0) {
    errors.push({ field: 'preferredStockPrice', message: 'Preferred stock price must be greater than 0' });
  }

  // Tax validation
  if (inputs.taxRate === null || inputs.taxRate === undefined || inputs.taxRate < 0) {
    errors.push({ field: 'taxRate', message: 'Tax rate must be 0 or greater' });
  }
  if (inputs.taxRate && inputs.taxRate > 100) {
    errors.push({ field: 'taxRate', message: 'Tax rate cannot exceed 100%' });
  }

  // Market data validation
  if (inputs.riskFreeRate === null || inputs.riskFreeRate === undefined || inputs.riskFreeRate < -0.1) {
    errors.push({ field: 'riskFreeRate', message: 'Risk free rate must be -10% or greater' });
  }
  if (inputs.riskFreeRate && inputs.riskFreeRate > 20) {
    errors.push({ field: 'riskFreeRate', message: 'Risk free rate cannot exceed 20%' });
  }

  if (inputs.marketRiskPremium === null || inputs.marketRiskPremium === undefined || inputs.marketRiskPremium < 0) {
    errors.push({ field: 'marketRiskPremium', message: 'Market risk premium must be 0 or greater' });
  }
  if (inputs.marketRiskPremium && inputs.marketRiskPremium > 20) {
    errors.push({ field: 'marketRiskPremium', message: 'Market risk premium cannot exceed 20%' });
  }

  if (inputs.companyBeta === null || inputs.companyBeta === undefined || inputs.companyBeta < -5) {
    errors.push({ field: 'companyBeta', message: 'Company beta must be -5 or greater' });
  }
  if (inputs.companyBeta && inputs.companyBeta > 5) {
    errors.push({ field: 'companyBeta', message: 'Company beta cannot exceed 5' });
  }

  // Company financials validation
  if (inputs.totalDebt && inputs.totalDebt < 0) {
    errors.push({ field: 'totalDebt', message: 'Total debt cannot be negative' });
  }

  if (inputs.totalAssets && inputs.totalAssets <= 0) {
    errors.push({ field: 'totalAssets', message: 'Total assets must be greater than 0' });
  }

  if (inputs.ebitda && inputs.ebitda < 0) {
    errors.push({ field: 'ebitda', message: 'EBITDA cannot be negative' });
  }

  if (inputs.interestExpense && inputs.interestExpense < 0) {
    errors.push({ field: 'interestExpense', message: 'Interest expense cannot be negative' });
  }

  if (inputs.debtToEquityRatio && inputs.debtToEquityRatio < 0) {
    errors.push({ field: 'debtToEquityRatio', message: 'Debt to equity ratio cannot be negative' });
  }

  if (inputs.debtToEbitdaRatio && inputs.debtToEbitdaRatio < 0) {
    errors.push({ field: 'debtToEbitdaRatio', message: 'Debt to EBITDA ratio cannot be negative' });
  }

  // Method validation
  const validMethods = ['bond_yield', 'loan_rate', 'credit_spread', 'synthetic_rating', 'weighted_average'];
  if (!inputs.calculationMethod || !validMethods.includes(inputs.calculationMethod)) {
    errors.push({ field: 'calculationMethod', message: 'Calculation method must be one of: bond_yield, loan_rate, credit_spread, synthetic_rating, weighted_average' });
  }

  const validWeightingMethods = ['book_value', 'market_value', 'equal_weight'];
  if (!inputs.weightingMethod || !validWeightingMethods.includes(inputs.weightingMethod)) {
    errors.push({ field: 'weightingMethod', message: 'Weighting method must be one of: book_value, market_value, equal_weight' });
  }

  // Cross-field validations
  if (inputs.totalDebt && inputs.totalAssets && inputs.totalDebt > inputs.totalAssets) {
    errors.push({ field: 'totalDebt', message: 'Total debt cannot exceed total assets' });
  }

  if (inputs.debtToEquityRatio && inputs.debtToEquityRatio > 10) {
    errors.push({ field: 'debtToEquityRatio', message: 'Debt to equity ratio above 10 may indicate financial distress' });
  }

  if (inputs.debtToEbitdaRatio && inputs.debtToEbitdaRatio > 15) {
    errors.push({ field: 'debtToEbitdaRatio', message: 'Debt to EBITDA ratio above 15 may indicate excessive leverage' });
  }

  return errors;
}

export function validateCostOfDebtBusinessRules(inputs: CostOfDebtInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Interest coverage warnings
  if (inputs.ebitda && inputs.interestExpense) {
    const interestCoverage = inputs.ebitda / inputs.interestExpense;
    if (interestCoverage < 1.5) {
      warnings.push({ field: 'interestExpense', message: 'Interest coverage ratio below 1.5x may indicate refinancing risk' });
    } else if (interestCoverage < 2.5) {
      warnings.push({ field: 'interestExpense', message: 'Interest coverage ratio below 2.5x may concern rating agencies' });
    }
  }

  // Leverage warnings
  if (inputs.debtToEquityRatio && inputs.debtToEquityRatio > 2) {
    warnings.push({ field: 'debtToEquityRatio', message: 'Debt to equity ratio above 2.0 may increase financial risk' });
  }

  if (inputs.debtToEbitdaRatio && inputs.debtToEbitdaRatio > 6) {
    warnings.push({ field: 'debtToEbitdaRatio', message: 'Debt to EBITDA ratio above 6.0 may limit borrowing capacity' });
  }

  // Credit rating warnings
  if (inputs.creditRating) {
    const rating = inputs.creditRating.toUpperCase();
    if (['CCC', 'CC', 'C', 'D'].includes(rating)) {
      warnings.push({ field: 'creditRating', message: 'Junk bond rating may significantly increase borrowing costs' });
    } else if (['BB', 'B'].includes(rating)) {
      warnings.push({ field: 'creditRating', message: 'High-yield rating may limit investor base' });
    }
  }

  // Maturity warnings
  if (inputs.bondYearsToMaturity && inputs.bondYearsToMaturity > 30) {
    warnings.push({ field: 'bondYearsToMaturity', message: 'Long bond maturity increases interest rate risk' });
  }

  // Tax rate warnings
  if (inputs.taxRate && inputs.taxRate > 40) {
    warnings.push({ field: 'taxRate', message: 'High tax rate significantly reduces tax shield benefits' });
  }

  // Beta warnings
  if (inputs.companyBeta && inputs.companyBeta > 2) {
    warnings.push({ field: 'companyBeta', message: 'High beta indicates significant business risk' });
  } else if (inputs.companyBeta && inputs.companyBeta < 0) {
    warnings.push({ field: 'companyBeta', message: 'Negative beta may indicate defensive characteristics' });
  }

  // Market condition warnings
  if (inputs.riskFreeRate && inputs.riskFreeRate > 10) {
    warnings.push({ field: 'riskFreeRate', message: 'High risk-free rate may indicate tight monetary policy' });
  }

  // Concentration warnings
  const totalSpecifiedDebt = (inputs.bondFaceValue || 0) + (inputs.bankLoanAmount || 0) +
                            (inputs.creditFacilityLimit * (inputs.creditFacilityUtilization || 0) / 100 || 0) +
                            (inputs.preferredStockParValue || 0);

  if (inputs.totalDebt && totalSpecifiedDebt / inputs.totalDebt > 0.9) {
    warnings.push({ field: 'totalDebt', message: 'Most debt appears to be specified - other debt may be missing' });
  }

  // Industry-specific warnings
  if (inputs.industry === 'financials' && inputs.debtToEquityRatio && inputs.debtToEquityRatio > 15) {
    warnings.push({ field: 'debtToEquityRatio', message: 'Financial firms typically have higher leverage, but this may be excessive' });
  }

  if (inputs.industry === 'utilities' && inputs.debtToEquityRatio && inputs.debtToEquityRatio < 0.5) {
    warnings.push({ field: 'debtToEquityRatio', message: 'Utilities typically have higher leverage for stable cash flows' });
  }

  return warnings;
}