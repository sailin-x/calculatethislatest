import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerAPTValueCalculatorCalculator } from './registerAPTValueCalculatorCalculator';

export function registerregisterAPTValueCalculatorCalculator(): void {
  calculatorRegistry.register(new registerAPTValueCalculatorCalculator());
}
