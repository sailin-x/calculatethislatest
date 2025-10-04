```typescript
import { InternalRateofReturnCalculatorInputs, InternalRateofReturnCalculatorMetrics, InternalRateofReturnCalculatorAnalysis } from './types';

// Helper function to calculate Net Present Value (NPV)
function npv(rate: number, cashFlows: number[]): number {
  if (rate < -0.999) {
    // Avoid division by zero or negative base issues
    return NaN;
  }
  return cashFlows.reduce((sum, cf, t) => sum + cf / Math.pow(1 + rate, t), 0);
}

// Helper function to calculate the derivative of NPV for Newton-Raphson
function npvDerivative(rate: number, cashFlows: number[]): number {
  if (rate < -0.999) {
    return NaN;
  }
  return cashFlows.reduce((sum, cf, t) => {
    if (t === 0) return sum;
    return sum - (t * cf) / Math.pow(1 + rate, t + 1);
  }, 0);
}

// Helper function to calculate IRR using Newton-Raphson method
function calculateIRR(cashFlows: number[], initialGuess: number = 0.1, tolerance: number = 1e-7, maxIterations: number = 100): number {
  if (cashFlows.length < 2) {
    return NaN; // Insufficient cash flows
  }

  let rate = initialGuess;
  let prevRate = rate;

  for (let i = 0; i < maxIterations; i++) {
    const npvVal = npv(rate, cashFlows);
    if (Math.abs(npvVal) < tolerance) {
      return rate;
    }

    const deriv = npvDerivative(rate, cashFlows);
    if (Math.abs(deriv) < 1e-10) {
      // Derivative too small; try bisection fallback if sign change exists
      const npvLow = npv(-0.5, cashFlows);
      const npvHigh = npv(10, cashFlows);
      if (npvLow * npvHigh >= 0) {
        return NaN; // No root or multiple roots
      }
      // Simple bisection fallback
      let low = -0.5;
      let high = 10;
      for (let j = 0; j < 50; j++) {
        const mid = (low + high) / 2;
        const midNpv = npv(mid, cashFlows);
        if (Math.abs(midNpv) < tolerance) {
          return mid;
        }
        if (npvLow * midNpv < 0) {
          high = mid;
        } else {
          low = mid;
        }
      }
      return (low + high) / 2;
    }

    prevRate = rate;
    rate -= npvVal / deriv;

    // Prevent oscillation or divergence
    if (Math.abs(rate - prevRate) < tolerance) {
      return rate;
    }

    // Clamp rate to reasonable bounds to avoid numerical instability
    if (rate < -0.99) rate = -0.99;
    if (rate > 100) rate = 100;
  }

  // Check final NPV
  if (Math.abs(npv(rate, cashFlows)) < tolerance * 10) {
    return rate;
  }

  return NaN; // Did not converge
}

export function calculateResult(inputs: InternalRateofReturnCalculatorInputs): number {
  const { cashFlows } = inputs;
  if (!cashFlows || !Array.isArray(cashFlows) || cashFlows.length === 0) {
    return NaN;
  }
  // Ensure cash flows are numbers
  const validCashFlows = cashFlows.filter(cf => typeof cf === 'number' && !isNaN(cf));
  if (validCashFlows.length < 2) {
    return NaN;
  }
  return calculateIRR(validCashFlows);
}

export function generateAnalysis(
  inputs: InternalRateofReturnCalculatorInputs,
  metrics: InternalRateofReturnCalculatorMetrics
): InternalRateofReturnCalculatorAnalysis {
  const result = metrics.result;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  let recommendation = '';

  if (isNaN(result)) {
    riskLevel = 'High';
    recommendation = 'Unable to calculate IRR. Please verify the cash flows include at least one outflow and one inflow.';
    return { recommendation, riskLevel };
  }

  // Risk level based on IRR (simplistic: higher IRR suggests potentially higher risk but better return; adjust based on context)
  if (result < 0) {
    riskLevel = 'High';
    recommendation = 'The investment yields a negative IRR, indicating a loss over time.';
  } else if (result <= 0.05) { // 0-5%
    riskLevel = 'Medium';
    recommendation = `The IRR of ${result.toFixed(2)}% is low.`;
  } else if (result <= 0.15) { // 5-15%
    riskLevel = 'Low';
    recommendation = `The IRR of ${result.toFixed(2)}% is moderate.`;
  } else { // >15%
    riskLevel = 'Low';
    recommendation = `The IRR of ${result.toFixed(2)}% is strong.`;
  }

  // Add recommendation logic
  if (result > 0) {
    recommendation += ' Consider the investment if this exceeds your required rate of return (hurdle rate).';
  } else {
    recommendation += ' Avoid this investment unless strategic factors apply.';
  }

  if (inputs.hurdleRate !== undefined && !isNaN(inputs.hurdleRate)) {
    if (result > inputs.hurdleRate) {
      recommendation += ' This meets or exceeds the hurdle rate.';
    } else {
      recommendation += ' This falls short of the hurdle rate.';
    }
  }

  return { recommendation, riskLevel };
}
```