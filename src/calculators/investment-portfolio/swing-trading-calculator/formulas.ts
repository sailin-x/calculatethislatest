```typescript
import { SwingTradingCalculatorInputs, SwingTradingCalculatorMetrics, SwingTradingCalculatorAnalysis } from './types';

/**
 * Calculates the risk-reward ratio for a swing trade.
 * Formula: (targetPrice - entryPrice) / (entryPrice - stopLossPrice)
 * @param entryPrice - The entry price of the trade
 * @param stopLossPrice - The stop-loss price
 * @param targetPrice - The target (take-profit) price
 * @returns The risk-reward ratio as a number
 */
function calculateRiskRewardRatio(entryPrice: number, stopLossPrice: number, targetPrice: number): number {
  const potentialReward = targetPrice - entryPrice;
  const potentialRisk = entryPrice - stopLossPrice;
  
  if (potentialRisk <= 0) {
    throw new Error('Invalid stop-loss: must be below entry price');
  }
  
  if (potentialReward <= 0) {
    throw new Error('Invalid target: must be above entry price');
  }
  
  return potentialReward / potentialRisk;
}

/**
 * Calculates the position size (number of shares) based on account balance and risk tolerance.
 * Formula: positionSize = (accountBalance * (riskPercentage / 100)) / (entryPrice - stopLossPrice)
 * @param accountBalance - The total account balance
 * @param riskPercentage - The percentage of account to risk (e.g., 1 for 1%)
 * @param entryPrice - The entry price
 * @param stopLossPrice - The stop-loss price
 * @returns The recommended position size in shares
 */
function calculatePositionSize(accountBalance: number, riskPercentage: number, entryPrice: number, stopLossPrice: number): number {
  if (accountBalance <= 0) {
    throw new Error('Account balance must be positive');
  }
  
  if (riskPercentage <= 0 || riskPercentage > 100) {
    throw new Error('Risk percentage must be between 0 and 100');
  }
  
  const riskAmount = accountBalance * (riskPercentage / 100);
  const riskPerShare = entryPrice - stopLossPrice;
  
  if (riskPerShare <= 0) {
    throw new Error('Stop-loss must be below entry price');
  }
  
  return Math.floor(riskAmount / riskPerShare); // Floor to whole shares for practicality
}

/**
 * Calculates the potential profit for the trade.
 * Formula: potentialProfit = positionSize * (targetPrice - entryPrice)
 * @param positionSize - The number of shares
 * @param targetPrice - The target price
 * @param entryPrice - The entry price
 * @returns The potential profit amount
 */
function calculatePotentialProfit(positionSize: number, targetPrice: number, entryPrice: number): number {
  return positionSize * (targetPrice - entryPrice);
}

/**
 * Calculates the potential loss for the trade.
 * Formula: potentialLoss = positionSize * (entryPrice - stopLossPrice)
 * @param positionSize - The number of shares
 * @param entryPrice - The entry price
 * @param stopLossPrice - The stop-loss price
 * @returns The potential loss amount
 */
function calculatePotentialLoss(positionSize: number, entryPrice: number, stopLossPrice: number): number {
  return positionSize * (entryPrice - stopLossPrice);
}

export function calculateResult(inputs: SwingTradingCalculatorInputs): number {
  // Main result: Recommended position size in shares for the swing trade
  const { accountBalance, riskPercentage, entryPrice, stopLossPrice } = inputs;
  
  try {
    return calculatePositionSize(accountBalance, riskPercentage, entryPrice, stopLossPrice);
  } catch (error) {
    // In production, handle errors gracefully; here return 0 as fallback
    console.error('Calculation error:', error);
    return 0;
  }
}

export function generateAnalysis(
  inputs: SwingTradingCalculatorInputs, 
  metrics: SwingTradingCalculatorMetrics
): SwingTradingCalculatorAnalysis {
  const { entryPrice, stopLossPrice, targetPrice } = inputs;
  const { positionSize, potentialProfit, riskRewardRatio } = metrics;
  
  // Determine risk level based on risk-reward ratio and position size relative to account
  // Low: RR >= 2:1 and position risk < 2% of account
  // Medium: RR >= 1.5:1 or position risk 2-5%
  // High: Otherwise
  let riskLevel: 'Low' | 'Medium' | 'High' = 'High';
  const accountRiskPercentage = (metrics.potentialLoss / inputs.accountBalance) * 100;
  
  if (riskRewardRatio >= 2 && accountRiskPercentage < 2) {
    riskLevel = 'Low';
  } else if (riskRewardRatio >= 1.5 || (accountRiskPercentage >= 2 && accountRiskPercentage <= 5)) {
    riskLevel = 'Medium';
  }
  
  // Generate recommendation based on swing trading principles
  let recommendation: string;
  if (riskRewardRatio >= 3) {
    recommendation = 'Strong setup: Excellent risk-reward ratio. Proceed with the calculated position size for optimal swing trade capture.';
  } else if (riskRewardRatio >= 2) {
    recommendation = 'Good setup: Favorable risk-reward. Enter the trade with the recommended position to manage risk effectively.';
  } else if (riskRewardRatio >= 1.5) {
    recommendation = 'Marginal setup: Risk-reward is acceptable but monitor closely. Consider adjusting stop-loss or target for better alignment.';
  } else {
    recommendation = 'Poor setup: Risk-reward ratio is too low. Avoid this trade or refine entry/stop/target levels to improve the setup.';
  }
  
  if (positionSize === 0) {
    recommendation = 'Invalid parameters: Cannot calculate a viable position size. Check entry, stop-loss, and account details.';
    riskLevel = 'High';
  }
  
  return { recommendation, riskLevel };
}
```