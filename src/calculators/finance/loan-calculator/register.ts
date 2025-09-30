import { calculatorRegistry } from '../../data/calculatorRegistry';
import { loancalculatorCalculator } from './loancalculatorCalculator';

export function registerloancalculatorCalculator(): void {
  calculatorRegistry.register(new loancalculatorCalculator());
}
