import { calculatorRegistry } from '../../data/calculatorRegistry';
import { alpha_betaCalculatorCalculator } from './alpha_betaCalculatorCalculator';

export function registeralpha_betaCalculatorCalculator(): void {
  calculatorRegistry.register(new alpha_betaCalculatorCalculator());
}
