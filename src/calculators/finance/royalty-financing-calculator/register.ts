import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RoyaltyFinancingCalculator } from './RoyaltyFinancingCalculator';

export function registerRoyaltyFinancingCalculator(): void {
  calculatorRegistry.register(RoyaltyFinancingCalculator);
}

export { RoyaltyFinancingCalculator };
