```typescript
import { CapitalGainsCalculatorInputs, CapitalGainsCalculatorMetrics, CapitalGainsCalculatorAnalysis } from './types';

/**
 * Helper function to determine if the holding period qualifies as long-term (US tax rules: >1 year).
 * Assumes holdingPeriodYears is provided in the inputs.
 */
function isLongTermHolding(inputs: CapitalGainsCalculatorInputs): boolean {
  return inputs.holdingPeriodYears > 1;
}

/**
 * Helper function to calculate the capital gain percentage relative to cost basis.
 * Used for risk assessment in analysis.
 */
function calculateGainPercentage(inputs: CapitalGainsCalculatorInputs, gain: number): number {
  if (inputs.costBasis <= 0) return 0;
  return (gain / inputs.costBasis) * 100;
}

export function calculateResult(inputs: CapitalGainsCalculatorInputs): number {
  // Capital gain formula: Sale proceeds minus cost basis.
  // This is the net capital gain (or loss if negative) before taxes.
  // Assumes saleProceeds already accounts for any selling costs/commissions.
  // Mathematically: Gain = Proceeds - Basis
  const capitalGain = inputs.saleProceeds - inputs.costBasis;
  return capitalGain;
}

export function generateAnalysis(
  inputs: CapitalGainsCalculatorInputs,
  metrics: CapitalGainsCalculatorMetrics
): CapitalGainsCalculatorAnalysis {
  const gain = metrics.result;
  const isLongTerm = isLongTermHolding(inputs);
  const gainPercentage = calculateGainPercentage(inputs, gain);

  // Risk level assessment:
  // - Low: Long-term gain/loss or small short-term gain (<20%)
  // - Medium: Short-term gain (20-50%)
  // - High: Large short-term gain (>50%) due to higher tax implications
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (!isLongTerm && gain > 0) {
    if (gainPercentage > 50) {
      riskLevel = 'High';
    } else if (gainPercentage > 20) {
      riskLevel = 'Medium';
    }
  }
  // Losses are always low risk (tax benefits)

  let recommendation: string;
  if (gain >= 0) {
    if (isLongTerm) {
      recommendation = `You have a long-term capital gain of $${gain.toFixed(2)} (${gainPercentage.toFixed(2)}% return). This qualifies for preferential long-term capital gains tax rates (0%, 15%, or 20% depending on income). Consider holding assets longer than 1 year for tax efficiency.`;
    } else {
      recommendation = `You have a short-term capital gain of $${gain.toFixed(2)} (${gainPercentage.toFixed(2)}% return). This is taxed at ordinary income rates (up to 37%). Future sales might benefit from longer holding periods to reduce tax liability.`;
    }
  } else {
    const lossAmount = Math.abs(gain);
    recommendation = `You have a capital loss of $${lossAmount.toFixed(2)} (${(gainPercentage).toFixed(2)}% return). Capital losses can offset capital gains dollar-for-dollar. Any excess can offset up to $3,000 of ordinary income per year (US rules), with carryover to future years. Consult a tax advisor for optimization.`;
  }

  return {
    recommendation,
    riskLevel,
  };
}
```