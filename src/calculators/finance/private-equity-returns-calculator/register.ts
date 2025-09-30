import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PrivateEquityReturnsCalculator } from './PrivateEquityReturnsCalculator';

export function registerPrivateEquityReturnsCalculator(): void {
  calculatorRegistry.register(PrivateEquityReturnsCalculator);
}

export { PrivateEquityReturnsCalculator };
