```typescript
import { 
  CrowdfundingEquityOfferingCalculatorInputs, 
  CrowdfundingEquityOfferingCalculatorMetrics, 
  CrowdfundingEquityOfferingCalculatorAnalysis 
} from './types';

/**
 * Helper function to calculate post-money valuation.
 * Formula: postMoney = preMoneyValuation + totalRaiseAmount
 */
function calculatePostMoneyValuation(
  preMoneyValuation: number, 
  totalRaiseAmount: number
): number {
  return preMoneyValuation + totalRaiseAmount;
}

/**
 * Main calculation function for the Crowdfunding Equity Offering Calculator.
 * Computes the investor's ownership percentage based on the investment amount
 * relative to the post-money valuation.
 * 
 * Formula:
 * postMoneyValuation = preMoneyValuation + totalRaiseAmount
 * ownershipPercentage = (investmentAmount / postMoneyValuation) * 100
 * 
 * @param inputs - The input parameters for the calculator.
 * @returns The ownership percentage as a number (e.g., 2.5 for 2.5%).
 */
export function calculateResult(inputs: CrowdfundingEquityOfferingCalculatorInputs): number {
  const { investmentAmount, preMoneyValuation, totalRaiseAmount } = inputs;
  
  // Validate inputs for non-negative values
  if (investmentAmount <= 0 || preMoneyValuation < 0 || totalRaiseAmount <= 0) {
    throw new Error('Invalid inputs: All amounts must be positive, pre-money valuation non-negative.');
  }
  
  if (investmentAmount > totalRaiseAmount) {
    throw new Error('Investment amount cannot exceed total raise amount.');
  }
  
  const postMoneyValuation = calculatePostMoneyValuation(preMoneyValuation, totalRaiseAmount);
  
  // Avoid division by zero (though postMoney should be > 0)
  if (postMoneyValuation === 0) {
    return 0;
  }
  
  const ownershipPercentage = (investmentAmount / postMoneyValuation) * 100;
  return Math.round(ownershipPercentage * 100) / 100; // Round to 2 decimal places
}

/**
 * Generates a detailed analysis and recommendation for the crowdfunding equity offering.
 * Assesses risk based on pre-money valuation (lower valuation = higher risk) and ownership percentage.
 * Provides a recommendation considering the investment's potential fit in an investment portfolio.
 * 
 * Risk Level Logic:
 * - High: preMoneyValuation < 1M or ownershipPercentage < 1%
 * - Medium: 1M <= preMoneyValuation < 5M or 1% <= ownershipPercentage < 5%
 * - Low: preMoneyValuation >= 5M and ownershipPercentage >= 5%
 * 
 * @param inputs - The input parameters for the calculator.
 * @param metrics - The computed metrics, including the result (ownership percentage).
 * @returns An analysis object with recommendation and riskLevel.
 */
export function generateAnalysis(
  inputs: CrowdfundingEquityOfferingCalculatorInputs, 
  metrics: CrowdfundingEquityOfferingCalculatorMetrics
): CrowdfundingEquityOfferingCalculatorAnalysis {
  const { preMoneyValuation, investmentAmount } = inputs;
  const { result: ownershipPercentage } = metrics;
  
  // Determine risk level
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Medium';
  if (preMoneyValuation < 1000000 || ownershipPercentage < 1) {
    riskLevel = 'High';
  } else if (preMoneyValuation >= 5000000 && ownershipPercentage >= 5) {
    riskLevel = 'Low';
  } else {
    riskLevel = 'Medium';
  }
  
  // Generate recommendation
  let recommendation = '';
  if (riskLevel === 'Low') {
    recommendation = `With a ${ownershipPercentage}% ownership stake from your $${investmentAmount.toLocaleString()} investment, this appears to be a relatively stable opportunity in the crowdfunding space. It could diversify your investment portfolio with moderate growth potential. Proceed with due diligence on the company's fundamentals.`;
  } else if (riskLevel === 'Medium') {
    recommendation = `Your $${investmentAmount.toLocaleString()} investment secures a ${ownershipPercentage}% stake, offering decent exposure to the company's growth. This is a balanced addition to your portfolio, but monitor regulatory compliance in equity crowdfunding. Consider consulting a financial advisor.`;
  } else {
    recommendation = `Securing a ${ownershipPercentage}% ownership with your $${investmentAmount.toLocaleString()} investment carries high risk due to the early-stage valuation. Equity crowdfunding is speculative; limit this to no more than 5-10% of your portfolio to manage risk. Thoroughly review the offering documents and team viability before investing.`;
  }
  
  return { 
    recommendation, 
    riskLevel 
  };
}
```