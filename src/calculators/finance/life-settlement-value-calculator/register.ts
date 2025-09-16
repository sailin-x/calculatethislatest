import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { lifeSettlementValueCalculator } from './LifeSettlementValueCalculator';

/**
 * Register the Life Settlement Value Calculator
 */
export function registerLifeSettlementValueCalculator(): void {
  calculatorRegistry.register(lifeSettlementValueCalculator);
}