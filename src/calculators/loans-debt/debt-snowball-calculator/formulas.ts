```typescript
import { 
  DebtSnowballCalculatorInputs, 
  DebtSnowballCalculatorMetrics, 
  DebtSnowballCalculatorAnalysis 
} from './types';

interface Debt {
  balance: number;
  apr: number;
  minPayment: number;
}

interface SimulationResult {
  months: number;
  totalPaid: number;
  totalInterest: number;
}

function simulateDebtSnowball(inputs: DebtSnowballCalculatorInputs): SimulationResult {
  if (inputs.debts.length === 0) {
    return { months: 0, totalPaid: 0, totalInterest: 0 };
  }

  // Sort debts by initial balance in ascending order (snowball method)
  const orderedDebts = [...inputs.debts].sort((a, b) => a.balance - b.balance);
  const remainingDebts = orderedDebts.map(d => ({ ...d })); // Shallow copy to avoid mutating inputs
  const initialTotalBalance = orderedDebts.reduce((sum, d) => sum + d.balance, 0);

  let months = 0;
  let totalPaid = 0.0;
  let currentTargetIndex = 0;
  const monthlyExtra = inputs.monthlyExtra || 0;

  while (currentTargetIndex < remainingDebts.length) {
    months++;

    // Accrue monthly interest on all remaining debts (from current target onward)
    const monthlyRate = (apr: number): number => apr / 1200; // apr / 12 / 100
    for (let i = currentTargetIndex; i < remainingDebts.length; i++) {
      const debt = remainingDebts[i];
      if (debt.balance > 0) {
        debt.balance *= (1 + monthlyRate(debt.apr));
      }
    }

    // Pay non-target debts (from next after target to end)
    const nonTargetStart = currentTargetIndex + 1;
    let sumActualNonPayments = 0.0;
    for (let i = nonTargetStart; i < remainingDebts.length; i++) {
      const debt = remainingDebts[i];
      if (debt.balance > 0) {
        const actualPayment = Math.min(debt.minPayment, debt.balance);
        debt.balance -= actualPayment;
        if (debt.balance < 0) debt.balance = 0;
        sumActualNonPayments += actualPayment;
      }
    }

    // Pay target debt
    const target = remainingDebts[currentTargetIndex];
    if (target.balance > 0) {
      const proposedTargetPayment = target.minPayment + monthlyExtra;
      const actualTargetPayment = Math.min(proposedTargetPayment, target.balance);
      target.balance -= actualTargetPayment;
      if (target.balance < 0) target.balance = 0;
      totalPaid += sumActualNonPayments + actualTargetPayment;

      // Advance target if paid off
      if (target.balance <= 0) {
        currentTargetIndex++;
      }
    } else {
      // If target already 0 (edge case), advance
      currentTargetIndex++;
      totalPaid += sumActualNonPayments;
    }

    // Skip any subsequent paid-off debts
    while (currentTargetIndex < remainingDebts.length && remainingDebts[currentTargetIndex].balance <= 0) {
      currentTargetIndex++;
    }
  }

  const totalInterest = totalPaid - initialTotalBalance;
  return { months, totalPaid, totalInterest };
}

export function calculateResult(inputs: DebtSnowballCalculatorInputs): number {
  // Returns the number of months to pay off all debts using the debt snowball method
  return simulateDebtSnowball(inputs).months;
}

export function generateAnalysis(
  inputs: DebtSnowballCalculatorInputs, 
  metrics: DebtSnowballCalculatorMetrics
): DebtSnowballCalculatorAnalysis {
  const months = metrics.result;
  const totalInterest = metrics.totalInterest;
  const totalInitialDebt = inputs.debts.reduce((sum, debt) => sum + debt.balance, 0);

  // Risk level based on payoff time (domain-specific: longer timelines indicate higher financial strain)
  let riskLevel: 'Low' | 'Medium' | 'High';
  if (months <= 12) {
    riskLevel = 'Low';
  } else if (months <= 36) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'High';
  }

  // Recommendation based on snowball progress and interest cost
  let recommendation: string;
  if (months === 0) {
    recommendation = 'No debts to pay off. Maintain good financial habits!';
  } else if (months <= 24) {
    recommendation = `Excellent momentum with the debt snowball method! You'll be debt-free in ${Math.round(months)} months, saving $${totalInterest.toFixed(2)} in interest. Continue paying minimums on all debts and directing extra payments to the smallest balance first.`;
  } else if (totalInterest > totalInitialDebt * 0.2) {
    recommendation = `The debt snowball will clear your debts in ${Math.round(months)} months, but interest costs are high at $${totalInterest.toFixed(2)}. Consider increasing your monthly extra payment or negotiating lower APRs on high-interest debts to accelerate payoff and reduce total cost.`;
  } else {
    recommendation = `Using the debt snowball, expect to be debt-free in ${Math.round(months)} months with $${totalInterest.toFixed(2)} in interest. List debts by balance (smallest first), pay minimums on others, and apply all extra to the target debt. Track progress monthly for motivation.`;
  }

  return { recommendation, riskLevel };
}
```