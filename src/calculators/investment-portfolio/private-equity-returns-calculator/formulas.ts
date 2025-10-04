```typescript
import { PrivateEquityReturnsCalculatorInputs, PrivateEquityReturnsCalculatorMetrics, PrivateEquityReturnsCalculatorAnalysis } from './types';

/**
 * Calculates Distributed to Paid-In (DPI) ratio for private equity investments.
 * DPI measures the cumulative distributions relative to the invested capital.
 * @param inputs - Calculator inputs containing distributions and investedCapital.
 * @returns DPI as a decimal (e.g., 0.5 for 50% return of capital).
 */
export function calculateDPI(inputs: PrivateEquityReturnsCalculatorInputs): number {
  if (inputs.investedCapital <= 0) {
    return 0;
  }
  return inputs.distributions / inputs.investedCapital;
}

/**
 * Calculates Residual Value to Paid-In (RVPI) ratio for private equity investments.
 * RVPI measures the current unrealized value relative to the invested capital.
 * @param inputs - Calculator inputs containing residualValue and investedCapital.
 * @returns RVPI as a decimal (e.g., 1.2 for 120% of invested capital in residual value).
 */
export function calculateRVPI(inputs: PrivateEquityReturnsCalculatorInputs): number {
  if (inputs.investedCapital <= 0) {
    return 0;
  }
  return inputs.residualValue / inputs.investedCapital;
}

/**
 * Calculates Total Value to Paid-In (TVPI) ratio for private equity investments.
 * TVPI = DPI + RVPI, representing total value (realized + unrealized) relative to invested capital.
 * @param dpi - The DPI value.
 * @param rvpi - The RVPI value.
 * @returns TVPI as a decimal (e.g., 1.7 for 170% total value multiple).
 */
export function calculateTVPI(dpi: number, rvpi: number): number {
  return dpi + rvpi;
}

/**
 * Calculates the money multiple (MOIC) for private equity investments.
 * MOIC represents the total value returned relative to invested capital.
 * @param inputs - Calculator inputs containing distributions, residualValue, and investedCapital.
 * @returns MOIC as a decimal (e.g., 2.0 for double the invested capital).
 */
export function calculateMOIC(inputs: PrivateEquityReturnsCalculatorInputs): number {
  if (inputs.investedCapital <= 0) {
    return 0;
  }
  const totalValue = inputs.distributions + inputs.residualValue;
  return totalValue / inputs.investedCapital;
}

/**
 * Approximates the annualized internal rate of return (IRR) for private equity investments.
 * This uses a simplified geometric average assuming cash flows are realized at the end of the holding period.
 * For precise IRR, full cash flow timing is required; this is a common quick-estimate in PE analysis.
 * Formula: (MOIC ^ (1 / holdingPeriodYears)) - 1, expressed as a percentage.
 * @param inputs - Calculator inputs containing investedCapital, distributions, residualValue, and holdingPeriodYears.
 * @returns Annualized IRR as a percentage (e.g., 15 for 15%).
 */
export function calculateApproximateIRR(inputs: PrivateEquityReturnsCalculatorInputs): number {
  if (inputs.investedCapital <= 0 || inputs.holdingPeriodYears <= 0) {
    return 0;
  }
  const moic = calculateMOIC(inputs);
  const annualizedMultiple = Math.pow(moic, 1 / inputs.holdingPeriodYears);
  return (annualizedMultiple - 1) * 100;
}

export function calculateResult(inputs: PrivateEquityReturnsCalculatorInputs): number {
  // Core calculation: Approximate annualized IRR as the primary result for private equity returns.
  // This is a standard metric in PE portfolio analysis for evaluating performance over time.
  return calculateApproximateIRR(inputs);
}

export function generateAnalysis(
  inputs: PrivateEquityReturnsCalculatorInputs,
  metrics: PrivateEquityReturnsCalculatorMetrics
): PrivateEquityReturnsCalculatorAnalysis {
  const result = metrics.result; // Annualized IRR percentage
  const dpi = calculateDPI(inputs);
  const rvpi = calculateRVPI(inputs);
  const tvpi = calculateTVPI(dpi, rvpi);

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  let recommendation = '';

  // Private equity-specific risk assessment: PE investments are inherently illiquid and high-risk.
  // Risk level is adjusted based on realized returns relative to typical PE benchmarks (target net IRR 15-25%).
  // Low: Underperforms conservative benchmarks (<10% IRR), lower realized risk but poor performance.
  // Medium: Aligns with moderate PE expectations (10-20% IRR).
  // High: Exceeds aggressive PE targets (>20% IRR), indicating higher volatility/risk taken for outsized returns.
  if (result < 10) {
    riskLevel = 'Low';
    recommendation = `The private equity investment shows an annualized return of ${result.toFixed(2)}%, underperforming typical PE benchmarks. With a TVPI of ${tvpi.toFixed(2)}x, consider exiting or reallocating to higher-performing funds to mitigate opportunity costs in an illiquid asset class.`;
  } else if (result >= 10 && result <= 20) {
    riskLevel = 'Medium';
    recommendation = `The private equity investment delivers a solid annualized return of ${result.toFixed(2)}%, aligning with moderate PE fund performance. TVPI of ${tvpi.toFixed(2)}x (DPI: ${dpi.toFixed(2)}, RVPI: ${rvpi.toFixed(2)}) suggests balanced realized and unrealized value—monitor residual value closely for liquidity events.`;
  } else {
    riskLevel = 'High';
    recommendation = `The private equity investment achieves a strong annualized return of ${result.toFixed(2)}%, surpassing typical PE targets. With a TVPI of ${tvpi.toFixed(2)}x, this outperforms peers; consider scaling exposure to similar vintages while managing the inherent illiquidity and leverage risks in PE.`;
  }

  return { recommendation, riskLevel };
}
```