import { NetOperatingIncomeInputs, NetOperatingIncomeMetrics, NetOperatingIncomeAnalysis } from './types';

// Calculate Gross Operating Income (GOI)
export function calculateGrossOperatingIncome(rentalIncome: number, otherIncome: number): number {
  return rentalIncome + otherIncome;
}

// Calculate Effective Gross Income (EGI) with vacancy allowance
export function calculateEffectiveGrossIncome(
  grossOperatingIncome: number,
  includeVacancyAllowance: boolean,
  vacancyRate: number
): number {
  if (!includeVacancyAllowance) return grossOperatingIncome;
  const vacancyLoss = grossOperatingIncome * (vacancyRate / 100);
  return grossOperatingIncome - vacancyLoss;
}

// Calculate total operating expenses
export function calculateTotalOperatingExpenses(inputs: NetOperatingIncomeInputs): number {
  const {
    propertyManagement,
    maintenance,
    repairs,
    utilities,
    insurance,
    propertyTaxes,
    legalFees,
    advertising,
    supplies,
    otherExpenses,
    includeReplacementReserve,
    replacementReserveRate
  } = inputs;

  let totalExpenses = propertyManagement + maintenance + repairs + utilities +
                     insurance + propertyTaxes + legalFees + advertising +
                     supplies + otherExpenses;

  // Add replacement reserve if enabled
  if (includeReplacementReserve && replacementReserveRate > 0) {
    const grossIncome = calculateGrossOperatingIncome(inputs.rentalIncome, inputs.otherIncome);
    const effectiveIncome = calculateEffectiveGrossIncome(grossIncome, inputs.includeVacancyAllowance, inputs.vacancyRate);
    const replacementReserve = effectiveIncome * (replacementReserveRate / 100);
    totalExpenses += replacementReserve;
  }

  return totalExpenses;
}

// Calculate Net Operating Income (NOI)
export function calculateNetOperatingIncome(effectiveGrossIncome: number, totalOperatingExpenses: number): number {
  return effectiveGrossIncome - totalOperatingExpenses;
}

// Calculate Operating Expense Ratio
export function calculateOperatingExpenseRatio(totalOperatingExpenses: number, effectiveGrossIncome: number): number {
  if (effectiveGrossIncome === 0) return 0;
  return (totalOperatingExpenses / effectiveGrossIncome) * 100;
}

// Calculate Net Income Ratio
export function calculateNetIncomeRatio(netOperatingIncome: number, effectiveGrossIncome: number): number {
  if (effectiveGrossIncome === 0) return 0;
  return (netOperatingIncome / effectiveGrossIncome) * 100;
}

// Calculate Break-Even Ratio
export function calculateBreakEvenRatio(operatingExpenseRatio: number): number {
  return operatingExpenseRatio;
}

// Generate expense breakdown
export function generateExpenseBreakdown(inputs: NetOperatingIncomeInputs): Array<{category: string, amount: number, percentage: number}> {
  const totalExpenses = calculateTotalOperatingExpenses(inputs);
  if (totalExpenses === 0) return [];

  const expenses = [
    { category: 'Property Management', amount: inputs.propertyManagement },
    { category: 'Maintenance', amount: inputs.maintenance },
    { category: 'Repairs', amount: inputs.repairs },
    { category: 'Utilities', amount: inputs.utilities },
    { category: 'Insurance', amount: inputs.insurance },
    { category: 'Property Taxes', amount: inputs.propertyTaxes },
    { category: 'Legal Fees', amount: inputs.legalFees },
    { category: 'Advertising', amount: inputs.advertising },
    { category: 'Supplies', amount: inputs.supplies },
    { category: 'Other Expenses', amount: inputs.otherExpenses }
  ];

  // Add replacement reserve if applicable
  if (inputs.includeReplacementReserve && inputs.replacementReserveRate > 0) {
    const grossIncome = calculateGrossOperatingIncome(inputs.rentalIncome, inputs.otherIncome);
    const effectiveIncome = calculateEffectiveGrossIncome(grossIncome, inputs.includeVacancyAllowance, inputs.vacancyRate);
    const replacementReserve = effectiveIncome * (inputs.replacementReserveRate / 100);
    expenses.push({ category: 'Replacement Reserve', amount: replacementReserve });
  }

  return expenses
    .filter(expense => expense.amount > 0)
    .map(expense => ({
      category: expense.category,
      amount: expense.amount,
      percentage: (expense.amount / totalExpenses) * 100
    }))
    .sort((a, b) => b.amount - a.amount);
}

// Generate NOI analysis
export function generateNoiAnalysis(
  inputs: NetOperatingIncomeInputs,
  metrics: NetOperatingIncomeMetrics
): NetOperatingIncomeAnalysis {
  const { netOperatingIncome, operatingExpenseRatio, netIncomeRatio } = metrics;

  // Determine profitability
  let profitability: 'excellent' | 'good' | 'fair' | 'poor' = 'poor';
  if (netIncomeRatio >= 40) profitability = 'excellent';
  else if (netIncomeRatio >= 30) profitability = 'good';
  else if (netIncomeRatio >= 20) profitability = 'fair';

  // Determine efficiency
  let efficiency: 'high' | 'moderate' | 'low' = 'low';
  if (operatingExpenseRatio <= 35) efficiency = 'high';
  else if (operatingExpenseRatio <= 45) efficiency = 'moderate';

  const recommendations = [];
  if (operatingExpenseRatio > 50) {
    recommendations.push('Operating expenses are high - review cost management strategies');
  }
  if (netIncomeRatio < 20) {
    recommendations.push('Net income ratio is low - consider rent increases or expense reductions');
  }
  if (inputs.includeVacancyAllowance && inputs.vacancyRate > 10) {
    recommendations.push('High vacancy rate - consider marketing improvements or rent adjustments');
  }

  const riskFactors = [];
  if (operatingExpenseRatio > 60) {
    riskFactors.push('Very high expense ratio indicates potential cash flow problems');
  }
  if (netOperatingIncome <= 0) {
    riskFactors.push('Negative NOI - property is not cash flow positive');
  }

  // Market comparison (simplified - in real app would use market data)
  const marketComparison = {
    noiVsMarket: netIncomeRatio >= 35 ? 'Above market average' : netIncomeRatio >= 25 ? 'At market average' : 'Below market average',
    expenseRatioVsMarket: operatingExpenseRatio <= 40 ? 'Below market average' : operatingExpenseRatio <= 50 ? 'At market average' : 'Above market average',
    recommendations: operatingExpenseRatio > 50 ? ['Compare expenses with similar properties'] : []
  };

  return {
    profitability,
    efficiency,
    recommendations,
    riskFactors,
    marketComparison
  };
}
