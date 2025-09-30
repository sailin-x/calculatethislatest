import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCreditDefaultSwapCalculatorCalculator } from './registerCreditDefaultSwapCalculatorCalculator';

export function registerregisterCreditDefaultSwapCalculatorCalculator(): void {
  calculatorRegistry.register(new registerCreditDefaultSwapCalculatorCalculator());
}
