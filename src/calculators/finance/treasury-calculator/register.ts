import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TreasuryCalculator } from './TreasuryCalculator';

export function registerTreasuryCalculator(): void {
  calculatorRegistry.register(TreasuryCalculator);
}

export { TreasuryCalculator };
