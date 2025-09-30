import { calculatorRegistry } from '../../data/calculatorRegistry';
import { betaCalculatorCalculator } from './betaCalculatorCalculator';

export function registerbetaCalculatorCalculator(): void {
  calculatorRegistry.register(new betaCalculatorCalculator());
}
