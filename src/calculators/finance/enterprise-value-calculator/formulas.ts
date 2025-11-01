import { EnterpriseValueCalculatorInputs, EnterpriseValueCalculatorMetrics, EnterpriseValueCalculatorAnalysis } from './types';

// Calculate Enterprise Value (EV)
export function calculateEnterpriseValue(inputs: EnterpriseValueCalculatorInputs): number {
  const { marketCap, totalDebt, cashAndEquivalents, preferredStock = 0, minorityInterest = 0 } = inputs;

  // EV = Market Cap + Total Debt + Preferred Stock + Minority Interest - Cash & Equivalents
  return marketCap + totalDebt + preferredStock + minorityInterest - cashAndEquivalents;
}

// Calculate Net Debt
export function calculateNetDebt(totalDebt: number, cashAndEquivalents: number): number {
  return totalDebt - cashAndEquivalents;
}

// Calculate Debt to Equity Ratio
export function calculateDebtToEquity(totalDebt: number, marketCap: number): number {
  if (marketCap <= 0) return 0;
  return totalDebt / marketCap;
}

// Calculate Cash to Debt Ratio
export function calculateCashToDebt(cashAndEquivalents: number, totalDebt: number): number {
  if (totalDebt <= 0) return 0;
  return cashAndEquivalents / totalDebt;
}

// Calculate Enterprise Value to Revenue Ratio
export function calculateEVToRevenue(enterpriseValue: number, revenue: number): number {
  if (revenue <= 0) return 0;
  return enterpriseValue / revenue;
}

// Calculate Enterprise Value to EBITDA Ratio
export function calculateEVToEBITDA(enterpriseValue: number, ebitda: number): number {
  if (ebitda <= 0) return 0;
  return enterpriseValue / ebitda;
}

// Generate Enterprise Value analysis
export function generateEnterpriseValueAnalysis(
  inputs: EnterpriseValueCalculatorInputs,
  metrics: EnterpriseValueCalculatorMetrics
): EnterpriseValueCalculatorAnalysis {
  const { enterpriseValue, debtToEquity, cashToDebt } = metrics;

  // Determine leverage level
  let leverage: 'low' | 'moderate' | 'high' = 'low';
  if (debtToEquity > 2) leverage = 'high';
  else if (debtToEquity > 1) leverage = 'moderate';

  // Determine valuation (simplified - would need industry benchmarks)
  let valuation: 'undervalued' | 'fairly_valued' | 'overvalued' = 'fairly_valued';
  // This would typically compare to industry averages

  const recommendations = [];
  if (leverage === 'high') recommendations.push('High leverage may increase financial risk');
  if (cashToDebt > 0.5) recommendations.push('Strong cash position provides financial flexibility');
  if (enterpriseValue < 0) recommendations.push('Negative enterprise value may indicate distressed situation');

  // Simplified industry comparison
  let industryComparison = 'Enterprise value analysis requires industry-specific benchmarks';
  if (leverage === 'low') industryComparison = 'Lower leverage than typical industry levels';
  else if (leverage === 'high') industryComparison = 'Higher leverage than typical industry levels';

  return {
    valuation,
    leverage,
    recommendations,
    industryComparison
  };
}
