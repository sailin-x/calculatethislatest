import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCreditUtilizationCalculator } from './registerCreditUtilizationCalculator';

export function registerregisterCreditUtilizationCalculator(): void {
  calculatorRegistry.register(new registerCreditUtilizationCalculator());
}
