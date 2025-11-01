import { consultant_utilization_rate_profitability_calculatorInputs, consultant_utilization_rate_profitability_calculatorMetrics, consultant_utilization_rate_profitability_calculatorAnalysis } from './types';


// Business Calculator - Financial metrics
export function calculateBreakEven(units: number, fixedCosts: number, pricePerUnit: number, variableCostPerUnit: number): number {
  return fixedCosts / (pricePerUnit - variableCostPerUnit);
}

export function calculateProfitMargin(revenue: number, costs: number): number {
  return ((revenue - costs) / revenue) * 100;
}

export function calculatePaybackPeriod(initialInvestment: number, annualCashFlow: number): number {
  return initialInvestment / annualCashFlow;
}

export function calculateResult(inputs: consultant_utilization_rate_profitability_calculatorInputs): number {
  // Use domain-specific calculations based on input properties
  try {
    // Try to match inputs to appropriate calculation
    if ('principal' in inputs && 'annualRate' in inputs && 'years' in inputs) {
      return calculateMonthlyPayment(inputs.principal, inputs.annualRate, inputs.years);
    }
    if ('initialInvestment' in inputs && 'finalValue' in inputs) {
      return calculateROI(inputs.initialInvestment, inputs.finalValue);
    }
    if ('weightKg' in inputs && 'heightCm' in inputs) {
      return calculateBMI(inputs.weightKg, inputs.heightCm);
    }
    if ('value' in inputs && 'percentage' in inputs) {
      return calculatePercentage(inputs.value, inputs.percentage);
    }
    // Fallback to basic calculation
    return inputs.value || inputs.amount || inputs.principal || 0;
  } catch (error) {
    console.warn('Calculation error:', error);
    return 0;
  }
}

export function generateAnalysis(inputs: consultant_utilization_rate_profitability_calculatorInputs, metrics: consultant_utilization_rate_profitability_calculatorMetrics): consultant_utilization_rate_profitability_calculatorAnalysis {
  const result = metrics.result;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (Math.abs(result) > 100000) riskLevel = 'High';
  else if (Math.abs(result) > 10000) riskLevel = 'Medium';

  const recommendation = result > 0 ?
    'Calculation completed successfully - positive result' :
    'Calculation completed - review inputs if result seems unexpected';

  return { recommendation, riskLevel };
}
