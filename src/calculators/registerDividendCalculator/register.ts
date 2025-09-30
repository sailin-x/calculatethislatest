import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerDividendCalculatorCalculator } from './registerDividendCalculatorCalculator';

export function registerregisterDividendCalculatorCalculator(): void {
  calculatorRegistry.register(new registerDividendCalculatorCalculator());
}
