import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerHSATripleTaxAdvantageCalculatorCalculator } from './registerHSATripleTaxAdvantageCalculatorCalculator';

export function registerregisterHSATripleTaxAdvantageCalculatorCalculator(): void {
  calculatorRegistry.register(new registerHSATripleTaxAdvantageCalculatorCalculator());
}
