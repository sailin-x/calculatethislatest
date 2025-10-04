```typescript
import { HedgeFundFeeCalculatorInputs, HedgeFundFeeCalculatorMetrics, HedgeFundFeeCalculatorAnalysis } from './types';

export function calculateResult(inputs: HedgeFundFeeCalculatorInputs): number {
  const { assetsUnderManagement: aum, expectedAnnualReturn: r, managementFee: mf, performanceFee: pf, highWaterMark } = inputs;

  const rDecimal = r / 100;
  const mfDecimal = mf / 100;
  const pfDecimal = pf / 100;

  const threshold = highWaterMark ?? aum;

  const grossEndingValue = aum * (1 + rDecimal);
  const managementFeeAmount = aum * mfDecimal;
  const netEndingBeforePerf = grossEndingValue - managementFeeAmount;
  const excessOverThreshold = Math.max(0, netEndingBeforePerf - threshold);
  const performanceFeeAmount = excessOverThreshold * pfDecimal;

  const totalFees = managementFeeAmount + performanceFeeAmount;

  return totalFees;
}

export function generateAnalysis(
  inputs: HedgeFundFeeCalculatorInputs,
  metrics: HedgeFundFeeCalculatorMetrics
): HedgeFundFeeCalculatorAnalysis {
  const totalFees = metrics.result;
  const totalFeePercent = (totalFees / inputs.assetsUnderManagement) * 100;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (totalFeePercent > 6) {
    riskLevel = 'High';
  } else if (totalFeePercent > 3) {
    riskLevel = 'Medium';
  }

  let recommendation: string;
  if (inputs.managementFee === 2 && inputs.performanceFee === 20) {
    recommendation = `Standard "2 and 20" fee structure. Total estimated fees: ${totalFeePercent.toFixed(2)}% of AUM.`;
  } else if (inputs.managementFee > 2 || inputs.performanceFee > 20) {
    recommendation = `Fees are above industry standard. Total estimated fees: ${totalFeePercent.toFixed(2)}% of AUM. Consider negotiating or exploring lower-fee alternatives to preserve more returns.`;
  } else {
    recommendation = `Fees are below standard. Total estimated fees: ${totalFeePercent.toFixed(2)}% of AUM. This structure is favorable for investors.`;
  }

  if (riskLevel === 'High') {
    recommendation += ' High fees could significantly erode net returns, especially in moderate performance scenarios.';
  } else if (riskLevel === 'Medium') {
    recommendation += ' Monitor performance closely, as fees represent a moderate portion of potential gains.';
  } else {
    recommendation += ' Fees are unlikely to materially impact overall portfolio performance.';
  }

  return { recommendation, riskLevel };
}
```