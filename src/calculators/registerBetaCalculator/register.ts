import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerBetaCalculatorCalculator } from './registerBetaCalculatorCalculator';

export function registerregisterBetaCalculatorCalculator(): void {
  calculatorRegistry.register(new registerBetaCalculatorCalculator());
}
