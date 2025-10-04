```typescript
import { DebtPayoffCalculatorInputs, DebtPayoffCalculatorMetrics, DebtPayoffCalculatorAnalysis } from './types';

interface Debt {
  balance: number;
  apr: number;
  minPayment: number;
}

function sortDebts(debts: Debt[], strategy: 'avalanche' | 'snowball'): Debt[] {
  const sorted = [...debts];
  if (strategy === 'avalanche') {
    // Sort by highest APR first to minimize interest
    sorted.sort((a, b) => b.apr - a.apr);
  } else {
    // Sort by smallest balance first for motivational wins
    sorted.sort((a, b) => a.balance - b.balance);
  }
  return sorted;
}

function simulatePayoff(inputs: DebtPayoffCalculatorInputs): { months: number; totalInterest: number } {
  const { debts, monthlyPayment, strategy } = inputs;
  const simDebts: Debt[] = sortDebts(debts, strategy).map(d => ({ ...d })); // Deep copy for simulation
  let months = 0;
  let totalInterest = 0;
  const maxIterations = 1200; // Prevent infinite loops for edge cases (e.g., negative amortization)

  while (months < maxIterations) {
    // Check if all debts are paid off
    const totalBalance = simDebts.reduce((sum, d) => sum + Math.max(0, d.balance), 0);
    if (totalBalance <= 0) {
      break;
    }

    months++;

    // Step 1: Accrue monthly interest on active debts
    for (const debt of simDebts) {
      if (debt.balance > 0) {
        const monthlyRate = debt.apr / 100 / 12;
        const interest = debt.balance * monthlyRate;
        debt.balance += interest;
        totalInterest += interest;
      }
    }

    // Step 2: Identify active debts and target
    const activeIndices: number[] = [];
    for (let i = 0; i < simDebts.length; i++) {
      if (simDebts[i].balance > 0) {
        activeIndices.push(i);
      }
    }
    if (activeIndices.length === 0) {
      break;
    }
    const targetIndex = activeIndices[0]; // Target is the first active in sorted order

    // Step 3: Calculate total minimum payment required
    let totalMin = 0;
    for (const idx of activeIndices) {
      totalMin += simDebts[idx].minPayment;
    }

    // Step 4: Apply payments
    if (monthlyPayment >= totalMin) {
      // Enough to cover all minimums + extra to target
      for (const idx of activeIndices) {
        const pay = Math.min(simDebts[idx].minPayment, simDebts[idx].balance);
        simDebts[idx].balance -= pay;
      }
      const extra = monthlyPayment - totalMin;
      if (extra > 0 && simDebts[targetIndex].balance > 0) {
        const pay = Math.min(extra, simDebts[targetIndex].balance);
        simDebts[targetIndex].balance -= pay;
      }
    } else {
      // Pro-rata distribution if insufficient funds (prioritize minimums proportionally)
      if (totalMin > 0) {
        const factor = monthlyPayment / totalMin;
        for (const idx of activeIndices) {
          const intendedPay = simDebts[idx].minPayment * factor;
          const pay = Math.min(intendedPay, simDebts[idx].balance);
          simDebts[idx].balance -= pay;
        }
      }
    }
  }

  if (months >= maxIterations) {
    // Edge case: Unable to pay off (e.g., high interest, low payments)
    return { months: -1, totalInterest }; // -1 indicates impractical payoff time
  }

  return { months, totalInterest };
}

export function calculateResult(inputs: DebtPayoffCalculatorInputs): number {
  // Primary result: total months to pay off all debts using the specified strategy
  // Uses month-by-month simulation for accuracy, accounting for interest accrual and payment allocation
  const { months } = simulatePayoff(inputs);
  return months;
}

export function generateAnalysis(
  inputs: DebtPayoffCalculatorInputs,
  metrics: DebtPayoffCalculatorMetrics
): DebtPayoffCalculatorAnalysis {
  const result = metrics.result; // Total months
  // Assume metrics also includes totalInterest for deeper analysis; fallback if not present
  const totalInterest = (metrics as any).totalInterest || 0;

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (result === -1 || result > 60) {
    riskLevel = 'High'; // Over 5 years or impossible
  } else if (result > 36) {
    riskLevel = 'Medium'; // Over 3 years
  }

  let recommendation = '';
  const averageApr = inputs.debts.reduce((sum, d) => sum + d.apr, 0) / inputs.debts.length;
  const totalDebt = inputs.debts.reduce((sum, d) => sum + d.balance, 0);
  const debtToPaymentRatio = totalDebt / inputs.monthlyPayment;

  if (inputs.strategy === 'avalanche') {
    recommendation = 'The debt avalanche strategy prioritizes high-interest debts, saving on total interest paid. ';
  } else {
    recommendation = 'The debt snowball strategy focuses on smallest balances first for quick wins and motivation. ';
  }

  if (averageApr > 15) {
    recommendation += 'High average APR detected; consider debt consolidation or refinancing to lower rates. ';
  }
  if (debtToPaymentRatio > 36) {
    recommendation += 'Debt load is high relative to payments; explore increasing income or cutting expenses to accelerate payoff. ';
  }
  if (totalInterest > totalDebt * 0.2) {
    recommendation += 'Significant interest costs; review budget to allocate more to debt repayment. ';
  }
  if (result <= 12) {
    recommendation += 'Excellent progress projected; maintain discipline to stay on track. ';
  }

  return { recommendation, riskLevel };
}
```