import { calculatorRegistry } from '../../data/calculatorRegistry';
import { rothiracalculatorCalculator } from './rothiracalculatorCalculator';

export function registerrothiracalculatorCalculator(): void {
  calculatorRegistry.register(new rothiracalculatorCalculator());
}
