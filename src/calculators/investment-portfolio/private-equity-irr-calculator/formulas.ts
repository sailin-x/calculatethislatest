```typescript
import { PrivateEquityIRRCalculatorInputs, PrivateEquityIRRCalculatorMetrics, PrivateEquityIRRCalculatorAnalysis } from './types';

/**
 * Calculates the Net Present Value (NPV) for given cash flows and discount rate.
 * Used as a helper in IRR computation for private equity cash flow analysis.
 * @param rate - The discount rate (e.g., IRR candidate).
 * @param cashFlows - Array of cash flows where index 0 is time 0 (initial investment, typically negative),
 *                    subsequent indices are end-of-period cash flows (distributions or residual value, positive).
 * @returns The NPV value.
 */
function calculateNPV(rate: number, cashFlows: number[]): number {
  return cashFlows.reduce((npv, cashFlow, period) => {
    return npv + cashFlow / Math.pow(1 + rate, period);
  }, 0);
}

/**
 * Calculates the derivative of NPV with respect to the rate (for Newton-Raphson).
 * Represents the sensitivity of NPV to changes in the discount rate.
 * @param rate - The discount rate.
 * @param cashFlows - Array of cash flows.
 * @returns The NPV derivative.
 */
function calculateNPVDerivative(rate: number, cashFlows: number[]): number {
  return cashFlows.reduce((derivative, cashFlow, period) => {
    if (period === 0) return derivative;
    const power = Math.pow(1 + rate, period);
    return derivative - (period * cashFlow) / Math.pow(power, 2);
  }, 0);
}

/**
 * Numerically computes the Internal Rate of Return (IRR) using the Newton-Raphson method.
 * Solves for the rate where NPV = 0, tailored for private equity cash flows (initial outflow followed by inflows).
 * Handles convergence with safeguards; assumes annual periods.
 * @param cashFlows - Array of cash flows: [initialInvestment (negative), cf1, cf2, ..., terminalValue (positive)].
 * @param tolerance - Convergence tolerance (default 1e-7).
 * @param maxIterations - Maximum iterations to prevent infinite loops (default 100).
 * @returns The IRR as a decimal (e.g., 0.15 for 15%); throws error if no convergence.
 */
function calculateIRR(cashFlows: number[], tolerance: number = 1e-7, maxIterations: number = 100): number {
  // Validate inputs: must have at least two cash flows, sum should change sign for real IRR
  if (cashFlows.length < 2) {
    throw new Error('At least two cash flows are required for IRR calculation.');
  }
  const totalInflows = cashFlows.slice(1).reduce((sum, cf) => sum + Math.max(0, cf), 0);
  const totalOutflows = Math.abs(cashFlows[0]) + cashFlows.slice(1).reduce((sum, cf) => sum + Math.max(0, -cf), 0);
  if (totalInflows < totalOutflows) {
    throw new Error('Cash flows do not indicate a positive IRR; inflows insufficient.');
  }

  // Initial guess: simple average annual return
  let rate = (totalInflows / totalOutflows - 1) / cashFlows.length;

  // Newton-Raphson iteration
  for (let i = 0; i < maxIterations; i++) {
    const npv = calculateNPV(rate, cashFlows);
    const derivative = calculateNPVDerivative(rate, cashFlows);

    if (Math.abs(npv) < tolerance) {
      return rate;
    }

    if (derivative === 0) {
      throw new Error('Derivative is zero; cannot converge.');
    }

    const newRate = rate - npv / derivative;
    // Safeguard: if rate becomes negative or too high, adjust
    if (newRate < -0.99) newRate = -0.99;
    if (newRate > 10) newRate = 10; // Cap extreme rates

    rate = newRate;
  }

  throw new Error(`IRR calculation did not converge within ${maxIterations} iterations.`);
}

/**
 * Computes the Internal Rate of Return (IRR) for the private equity investment.
 * Assumes cashFlows array includes initial investment as negative at index 0,
 * followed by periodic distributions (positive), and final residual/terminal value.
 * Returns IRR as a decimal percentage (e.g., 0.20 for 20%).
 */
export function calculateResult(inputs: PrivateEquityIRRCalculatorInputs): number {
  try {
    // Ensure cashFlows[0] is negative (initial investment)
    const cashFlows = inputs.cashFlows.map(cf => (cf < 0 ? cf : cf));
    if (cashFlows[0] >= 0) {
      throw new Error('Initial cash flow must be negative (investment outflow).');
    }

    // Append terminal value if provided separately, or assume it's in the last cash flow
    const fullCashFlows = inputs.terminalValue ? [...inputs.cashFlows, inputs.terminalValue] : inputs.cashFlows;

    return calculateIRR(fullCashFlows);
  } catch (error) {
    // In production, log error; here return NaN for invalid cases
    console.error('IRR calculation error:', error);
    return NaN;
  }
}

/**
 * Generates a domain-specific analysis for the private equity IRR, including recommendation and risk level.
 * Risk assessment based on IRR benchmarks for private equity (e.g., >20% attractive, 10-20% moderate, <10% high risk).
 * Recommendation considers IRR relative to typical private equity hurdles (8-12% cost of capital) and investment horizon.
 */
export function generateAnalysis(
  inputs: PrivateEquityIRRCalculatorInputs,
  metrics: PrivateEquityIRRCalculatorMetrics
): PrivateEquityIRRCalculatorAnalysis {
  const irr = metrics.result;
  const investmentHorizon = inputs.cashFlows.length - 1; // Approximate years
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';

  // Private equity-specific risk assessment
  if (irr > 0.20) {
    riskLevel = 'Low'; // Exceeds typical PE target returns
  } else if (irr >= 0.10) {
    riskLevel = 'Medium'; // Meets or approaches hurdle but below top quartile
  } else if (irr >= 0.08) {
    riskLevel = 'Medium'; // Around cost of capital, viable but cautious
  } else {
    riskLevel = 'High'; // Below hurdle, potential capital loss risk
  }

  // Generate recommendation based on IRR, horizon, and total committed capital
  const totalCommitted = Math.abs(inputs.cashFlows[0]);
  let recommendation: string;
  if (isNaN(irr)) {
    recommendation = 'Invalid inputs; please verify cash flows and terminal value for accurate IRR computation.';
  } else if (irr > 0.20 && investmentHorizon <= 7) {
    recommendation = `With an IRR of ${ (irr * 100).toFixed(1) }%, this private equity investment offers strong returns within a reasonable ${investmentHorizon}-year horizon. Recommend proceeding, as it outperforms typical PE benchmarks and justifies the ${totalCommitted.toLocaleString()} committed capital.`;
  } else if (irr >= 0.10) {
    recommendation = `The calculated IRR of ${ (irr * 100).toFixed(1) }% indicates moderate attractiveness for this ${investmentHorizon}-year private equity commitment of ${totalCommitted.toLocaleString()}. Consider if it aligns with your portfolio's risk-adjusted return targets; diversification may be needed.`;
  } else {
    recommendation = `IRR of ${ (irr * 100).toFixed(1) }% falls below private equity hurdles for the ${investmentHorizon}-year period and ${totalCommitted.toLocaleString()} investment. High risk of underperformance; recommend avoiding or negotiating better terms.`;
  }

  return { recommendation, riskLevel };
}
```