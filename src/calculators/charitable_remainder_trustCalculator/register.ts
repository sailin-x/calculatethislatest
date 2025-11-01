import { calculatorRegistry } from '../../data/calculatorRegistry';
import { charitable_remainder_trustCalculator } from './charitable_remainder_trustCalculator';

export function registercharitable_remainder_trustCalculator(): void {
  calculatorRegistry.register(new charitable_remainder_trustCalculator());
}
