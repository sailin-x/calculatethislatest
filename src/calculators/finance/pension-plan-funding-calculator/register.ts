import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { pensionPlanFundingCalculator } from './PensionPlanFundingCalculator';

/**
 * Register the Pension Plan Funding Calculator
 */
export function registerPensionPlanFundingCalculator(): void {
  calculatorRegistry.register(pensionPlanFundingCalculator);
}