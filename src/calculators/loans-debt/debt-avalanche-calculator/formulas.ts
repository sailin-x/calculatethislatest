```typescript
import { DebtAvalancheCalculatorInputs, DebtAvalancheCalculatorMetrics, DebtAvalancheCalculatorAnalysis } from './types';

// Domain-specific helper function for debt avalanche simulation
// Simulates month-by-month repayment using avalanche method: pay minimums on all debts,
// add interest monthly, and apply extra payment to highest-interest debt first (moving to next when paid off).
// Returns the number of months to pay off all debt.
function simulateAvalancheMonths(inputs: DebtAvalancheCalculatorInputs): number {
  const { debts, extraPayment } = inputs;
  if (debts.length === 0 || debts.every(d => d.balance <= 0)) {
    return 0;
  }

  // Clone and sort debts by APR descending (avalanche prioritizes highest interest)
  const sortedDebts = [...debts].sort((a, b) => b.apr - a.apr);
  const monthlyRates = sortedDebts.map(d => d.apr / 100 / 12); // Monthly interest rate
  let balances = sortedDebts.map(d => d.balance);
  let months = 0;
  let targetIndex = 0;

  // Safety check to prevent infinite loops (e.g., if payments don't cover interest)
  const maxIterations = 1200; // ~100 years

  while (balances.some(b => b > 0) && months < maxIterations) {
    months++;

    // Step 1: Accrue monthly interest on all active balances
    for (let i = 0; i < balances.length; i++) {
      if (balances[i] > 0) {
        balances[i] += balances[i] * monthlyRates[i];
        // Round to 2 decimal places for financial precision
        balances[i] = Math.round(balances[i] * 100) / 100;
      }
    }

    // Step 2: Pay minimum payments on all active debts
    for (let i = 0; i < balances.length; i++) {
      if (balances[i] > 0) {
        let payment = sortedDebts[i].minPayment;
        if (balances[i] < payment) {
          payment = balances[i];
        }
        balances[i] -= payment;
        balances[i] = Math.max(0, balances[i]); // Ensure non-negative
      }
    }

    // Step 3: Apply extra payment to the current target (highest remaining interest debt)
    let extraRemaining = extraPayment;
    while (extraRemaining > 0 && targetIndex < balances.length) {
      if (balances[targetIndex] > 0) {
        let payment = Math.min(extraRemaining, balances[targetIndex]);
        balances[targetIndex] -= payment;
        balances[targetIndex] = Math.max(0, balances[targetIndex]);
        extraRemaining -= payment;
        if (balances[targetIndex] <= 0) {
          targetIndex++; // Move to next debt
        }
      } else {
        targetIndex++; // Skip paid-off debts
      }
    }
  }

  if (months >= maxIterations) {
    throw new Error('Simulation exceeded maximum iterations; payments may not cover interest.');
  }

  return months;
}

export function calculateResult(inputs: DebtAvalancheCalculatorInputs): number {
  // Core calculation: total months to debt freedom using avalanche method
  // This uses real debt repayment simulation with compound monthly interest and targeted extra payments
  return simulateAvalancheMonths(inputs);
}

export function generateAnalysis(
  inputs: DebtAvalancheCalculatorInputs,
  metrics: DebtAvalancheCalculatorMetrics
): DebtAvalancheCalculatorAnalysis {
  const result = metrics.result; // Months to payoff
  const { debts, extraPayment } = inputs;

  // Domain-specific risk assessment: based on maximum APR (high-interest debt increases risk of prolonged payoff)
  const maxApr = debts.length > 0 ? Math.max(...debts.map(d => d.apr)) : 0;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (maxApr > 20) {
    riskLevel = 'High';
  } else if (maxApr > 15) {
    riskLevel = 'Medium';
  }

  // Total initial debt for context
  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);

  // Loans-debt-specific recommendation: Emphasize interest minimization and strategy adherence
  const recommendation = debts.length > 0
    ? `Using the debt avalanche method, prioritize paying off your highest-interest debt (${maxApr}%) first while making minimum payments on others. With an extra payment of $${extraPayment.toFixed(2)} per month, you can eliminate $${totalDebt.toFixed(2)} in total debt in approximately ${result} months, minimizing overall interest costs. Stay consistent to avoid extending the payoff timeline.`
    : 'No debts entered; you are already debt-free! Consider building an emergency fund.';

  return { recommendation, riskLevel };
}
```