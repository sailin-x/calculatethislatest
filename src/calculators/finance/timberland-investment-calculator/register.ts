import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { timberlandInvestmentCalculator } from './TimberlandInvestmentCalculator';

/**
 * Register the Timberland Investment Calculator
 */
export function registerTimberlandInvestmentCalculator(): void {
  calculatorRegistry.register(timberlandInvestmentCalculator);
}