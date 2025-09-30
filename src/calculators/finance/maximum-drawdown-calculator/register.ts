import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MaximumDrawdownCalculator } from './MaximumDrawdownCalculator';

export function registerMaximumDrawdownCalculator(): void {
  calculatorRegistry.register(MaximumDrawdownCalculator);
}

export { MaximumDrawdownCalculator };
