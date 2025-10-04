```typescript
import { 
  AssetBasedLendingCalculatorInputs, 
  AssetBasedLendingCalculatorMetrics, 
  AssetBasedLendingCalculatorAnalysis 
} from './types';

/**
 * Calculates the effective advance rate as a helper function.
 * This is the weighted average advance rate based on asset values.
 */
function calculateEffectiveAdvanceRate(
  eligibleAccountsReceivable: number,
  arAdvanceRate: number,
  eligibleInventory: number,
  inventoryAdvanceRate: number
): number {
  const totalAssets = eligibleAccountsReceivable + eligibleInventory;
  if (totalAssets === 0) {
    return 0;
  }
  const weightedAr = (eligibleAccountsReceivable / totalAssets) * arAdvanceRate;
  const weightedInv = (eligibleInventory / totalAssets) * inventoryAdvanceRate;
  return weightedAr + weightedInv;
}

/**
 * Calculates the borrowing base for asset-based lending.
 * Formula: Borrowing Base = (Eligible AR * AR Advance Rate) + (Eligible Inventory * Inventory Advance Rate)
 * This represents the maximum loan amount available based on eligible collateral.
 * 
 * @param inputs - The calculator inputs including eligible assets and advance rates (as decimals, e.g., 0.8 for 80%).
 * @returns The borrowing base amount as a number.
 */
export function calculateResult(inputs: AssetBasedLendingCalculatorInputs): number {
  const { eligibleAccountsReceivable, arAdvanceRate, eligibleInventory, inventoryAdvanceRate } = inputs;
  
  // Validate inputs (basic production-ready checks)
  if (eligibleAccountsReceivable < 0 || eligibleInventory < 0) {
    throw new Error('Asset values must be non-negative');
  }
  if (arAdvanceRate < 0 || arAdvanceRate > 1 || inventoryAdvanceRate < 0 || inventoryAdvanceRate > 1) {
    throw new Error('Advance rates must be between 0 and 1');
  }
  
  const arContribution = eligibleAccountsReceivable * arAdvanceRate;
  const inventoryContribution = eligibleInventory * inventoryAdvanceRate;
  
  return arContribution + inventoryContribution;
}

/**
 * Generates an analysis for the asset-based lending calculation.
 * Includes risk assessment based on:
 * - Inventory reliance: Higher inventory percentage increases risk (less liquid collateral).
 * - Effective advance rate: Higher rates indicate more aggressive lending, increasing risk.
 * 
 * Risk Levels:
 * - Low: Inventory < 30% of total assets AND effective advance rate <= 0.6
 * - Medium: Inventory 30-60% OR effective advance rate 0.6-0.8
 * - High: Inventory > 60% OR effective advance rate > 0.8
 * 
 * @param inputs - The original calculator inputs.
 * @param metrics - The computed metrics including the result (borrowing base).
 * @returns An analysis object with recommendation and riskLevel.
 */
export function generateAnalysis(
  inputs: AssetBasedLendingCalculatorInputs, 
  metrics: AssetBasedLendingCalculatorMetrics
): AssetBasedLendingCalculatorAnalysis {
  const { eligibleAccountsReceivable, arAdvanceRate, eligibleInventory, inventoryAdvanceRate } = inputs;
  const result = metrics.result; // Borrowing base
  
  const totalAssets = eligibleAccountsReceivable + eligibleInventory;
  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  let recommendation = '';

  if (totalAssets === 0) {
    riskLevel = 'Low';
    recommendation = 'No eligible assets available. Review asset eligibility before proceeding with lending.';
    return { recommendation, riskLevel };
  }

  // Calculate inventory percentage (higher inventory = higher risk due to lower liquidity)
  const inventoryPercentage = eligibleInventory / totalAssets;
  
  // Calculate effective advance rate
  const effectiveAdvanceRate = calculateEffectiveAdvanceRate(
    eligibleAccountsReceivable,
    arAdvanceRate,
    eligibleInventory,
    inventoryAdvanceRate
  );

  // Risk assessment logic
  let riskReasons: string[] = [];
  if (inventoryPercentage > 0.6) {
    riskLevel = 'High';
    riskReasons.push('High reliance on inventory (over 60%), which is less liquid than accounts receivable.');
  } else if (inventoryPercentage > 0.3) {
    if (riskLevel !== 'High') riskLevel = 'Medium';
    riskReasons.push('Moderate reliance on inventory (30-60%). Consider diversifying collateral.');
  }

  if (effectiveAdvanceRate > 0.8) {
    riskLevel = 'High';
    riskReasons.push('High effective advance rate (>80%), indicating aggressive lending terms.');
  } else if (effectiveAdvanceRate > 0.6) {
    if (riskLevel !== 'High') riskLevel = 'Medium';
    riskReasons.push('Moderate effective advance rate (60-80%). Monitor collateral closely.');
  }

  // Fallback to Low if no medium/high triggers
  if (riskLevel === 'Low') {
    riskReasons.push('Balanced collateral with conservative advance rates.');
  }

  // Generate recommendation
  const formattedResult = result.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const formattedTotalAssets = totalAssets.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const effectiveRatePercent = (effectiveAdvanceRate * 100).toFixed(1);

  recommendation = `The borrowing base is ${formattedResult}, representing ${effectiveRatePercent}% of total eligible assets (${formattedTotalAssets}). `;
  
  if (riskLevel === 'Low') {
    recommendation += 'This setup supports stable lending with low risk. Proceed with confidence, ensuring ongoing collateral monitoring.';
  } else if (riskLevel === 'Medium') {
    recommendation += `Risk is medium due to: ${riskReasons.join(' ')}. Recommend enhanced due diligence on inventory valuation and receivables aging.';
  } else {
    recommendation += `High risk identified due to: ${riskReasons.join(' ')}. Strongly advise conservative loan sizing, frequent audits, and potential collateral adjustments.';
  }

  return { recommendation, riskLevel };
}
```