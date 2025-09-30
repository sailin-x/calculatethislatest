import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PrivateEquityIrrCalculator } from './PrivateEquityIrrCalculator';

export function registerPrivateEquityIrrCalculator(): void {
  calculatorRegistry.register(PrivateEquityIrrCalculator);
}

export { PrivateEquityIrrCalculator };
