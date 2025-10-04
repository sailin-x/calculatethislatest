```typescript
import { 
  PostMoneyValuationCalculatorInputs, 
  PostMoneyValuationCalculatorMetrics, 
  PostMoneyValuationCalculatorAnalysis 
} from './types';

// Helper function to calculate investor ownership percentage post-investment
// Formula: (investmentAmount / postMoneyValuation) * 100
function calculateOwnershipPercentage(investmentAmount: number, postMoneyValuation: number): number {
  if (postMoneyValuation === 0) {
    return 0;
  }
  return (investmentAmount / postMoneyValuation) * 100;
}

// Helper function to assess investment risk level based on ownership dilution
// In venture capital, higher dilution (>30%) often indicates early-stage/high-risk investments;
// 10-30% suggests growth-stage/medium risk; <10% implies late-stage/low risk.
function assessRiskLevel(ownershipPercentage: number): 'Low' | 'Medium' | 'High' {
  if (ownershipPercentage > 30) {
    return 'High';
  } else if (ownershipPercentage > 10) {
    return 'Medium';
  } else {
    return 'Low';
  }
}

export function calculateResult(inputs: PostMoneyValuationCalculatorInputs): number {
  // Post-money valuation formula: preMoneyValuation + investmentAmount
  // This is the standard valuation post-investment round in venture capital.
  const { preMoneyValuation, investmentAmount } = inputs;
  if (preMoneyValuation < 0 || investmentAmount < 0) {
    throw new Error('Pre-money valuation and investment amount must be non-negative.');
  }
  return preMoneyValuation + investmentAmount;
}

export function generateAnalysis(
  inputs: PostMoneyValuationCalculatorInputs, 
  metrics: PostMoneyValuationCalculatorMetrics
): PostMoneyValuationCalculatorAnalysis {
  const postMoneyValuation = metrics.result;
  const ownershipPercentage = calculateOwnershipPercentage(inputs.investmentAmount, postMoneyValuation);
  const riskLevel = assessRiskLevel(ownershipPercentage);

  // Generate recommendation based on post-money valuation and ownership implications
  // In portfolio management, this helps evaluate dilution impact on existing shareholders
  // and the investor's stake in the portfolio.
  const formattedPostMoney = postMoneyValuation.toLocaleString();
  const formattedOwnership = ownershipPercentage.toFixed(2);
  const stageIndication = riskLevel === 'High' ? 'early-stage' : 
                          riskLevel === 'Medium' ? 'growth-stage' : 'late-stage';

  const recommendation = `The post-money valuation of $${formattedPostMoney} results in the investor acquiring ${formattedOwnership}% ownership. This ${stageIndication} investment may offer high growth potential but consider dilution effects on your portfolio's existing holdings. Recommend diversifying if this stake exceeds 15% of your venture allocation.`;

  return { 
    recommendation, 
    riskLevel 
  };
}
```