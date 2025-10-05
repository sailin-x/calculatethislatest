import { personal-injury-settlement-calculatorInputs, personal-injury-settlement-calculatorMetrics, personal-injury-settlement-calculatorAnalysis } from './types';

// Personal Injury Settlement Calculator
export function calculateEconomicDamages(medicalExpenses: number, lostWages: number, futureEarnings: number): number {
  return medicalExpenses + lostWages + futureEarnings;
}

export function calculateNonEconomicDamages(pain: number, suffering: number, emotionalDistress: number): number {
  return pain + suffering + emotionalDistress;
}

export function calculateTotalDamages(economic: number, nonEconomic: number, punitive: number): number {
  return economic + nonEconomic + punitive;
}

export function calculateSettlementRange(totalDamages: number, liabilityPercentage: number): { min: number; max: number } {
  const baseAmount = totalDamages * (liabilityPercentage / 100);
  return {
    min: baseAmount * 0.7,
    max: baseAmount * 1.3
  };
}

export function calculateResult(inputs: personal-injury-settlement-calculatorInputs): number {
  if ('medicalExpenses' in inputs && 'lostWages' in inputs && 'painAndSuffering' in inputs) {
    const economic = calculateEconomicDamages(
      inputs.medicalExpenses,
      inputs.lostWages,
      inputs.futureEarningsLoss || 0
    );
    const nonEconomic = inputs.painAndSuffering;
    return calculateTotalDamages(economic, nonEconomic, inputs.punitiveDamages || 0);
  }
  return 0;
}

export function generateAnalysis(inputs: personal-injury-settlement-calculatorInputs, metrics: personal-injury-settlement-calculatorMetrics): personal-injury-settlement-calculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result > 1000000) riskLevel = 'High';
  else if (result > 100000) riskLevel = 'Medium';

  const recommendation = 'Settlement amount calculated. Consult with legal counsel for case-specific factors.';

  return { recommendation, riskLevel };
}