import { calculatorRegistry } from '../../data/calculatorRegistry';
import { sepiracalculatorCalculator } from './sepiracalculatorCalculator';

export function registersepiracalculatorCalculator(): void {
  calculatorRegistry.register(new sepiracalculatorCalculator());
}
