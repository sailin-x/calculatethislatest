```typescript
import { PricetoEarningsCalculatorInputs, PricetoEarningsCalculatorMetrics, PricetoEarningsCalculatorAnalysis } from './types';

// Domain-specific helper function: Validate inputs for division by zero and negative values in P/E context
function validatePEInputs(inputs: PricetoEarningsCalculatorInputs): { valid: boolean; error?: string } {
  if (inputs.eps <= 0) {
    return { valid: false, error: 'Earnings per share (EPS) must be positive for P/E calculation.' };
  }
  if (inputs.price < 0) {
    return { valid: false, error: 'Stock price cannot be negative.' };
  }
  return { valid: true };
}

// Domain-specific helper function: Categorize P/E ratio relative to common market benchmarks
// (e.g., historical S&P 500 average ~15-20; low <10 undervalued, high >30 overvalued)
function categorizePERatio(peRatio: number): { category: 'Undervalued' | 'FairlyValued' | 'Overvalued'; benchmarkNote: string } {
  if (peRatio < 10) {
    return { category: 'Undervalued', benchmarkNote: 'Below typical market low; potential bargain if fundamentals strong.' };
  } else if (peRatio >= 10 && peRatio <= 20) {
    return { category: 'FairlyValued', benchmarkNote: 'Within historical S&P 500 average range; stable valuation.' };
  } else if (peRatio > 20 && peRatio <= 30) {
    return { category: 'FairlyValued', benchmarkNote: 'Slightly above average; monitor growth expectations.' };
  } else {
    return { category: 'Overvalued', benchmarkNote: 'Above typical market high; risk of correction if earnings disappoint.' };
  }
}

export function calculateResult(inputs: PricetoEarningsCalculatorInputs): number {
  const validation = validatePEInputs(inputs);
  if (!validation.valid) {
    throw new Error(validation.error || 'Invalid inputs for P/E calculation.');
  }

  // Core P/E formula: Price per share / Earnings per share (EPS)
  // This measures how much investors pay per unit of earnings, a key valuation metric in portfolio analysis
  const peRatio = inputs.price / inputs.eps;
  return Math.round(peRatio * 100) / 100; // Round to 2 decimal places for production precision
}

export function generateAnalysis(inputs: PricetoEarningsCalculatorInputs, metrics: PricetoEarningsCalculatorMetrics): PricetoEarningsCalculatorAnalysis {
  const peRatio = metrics.result;

  // InvestmentPortfolioSpecific risk assessment: Higher P/E indicates higher valuation risk (potential overpayment)
  // Lower P/E may signal undervaluation but could reflect underlying risks (e.g., declining earnings)
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  if (peRatio < 10) {
    riskLevel = 'Low'; // Lower valuation risk, but assess company fundamentals
  } else if (peRatio > 30) {
    riskLevel = 'High'; // Higher risk of market correction or earnings miss
  }

  const categorization = categorizePERatio(peRatio);
  const recommendation = `The P/E ratio of ${peRatio} suggests the stock is ${categorization.category.toLowerCase()}. ${categorization.benchmarkNote} Consider industry averages and growth prospects before adding to your portfolio.`;

  return { recommendation, riskLevel };
}
```