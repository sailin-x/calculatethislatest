import { calculatorRegistry } from '../../data/calculatorRegistry';
import { paydayloancalculatorCalculator } from './paydayloancalculatorCalculator';

export function registerpaydayloancalculatorCalculator(): void {
  calculatorRegistry.register(new paydayloancalculatorCalculator());
}
