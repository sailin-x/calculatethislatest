import { calculatorRegistry } from '../../data/calculatorRegistry';
import { DividendCalculatorCalculator } from './DividendCalculatorCalculator';

export function registerDividendCalculatorCalculator(): void {
  calculatorRegistry.register(new DividendCalculatorCalculator());
}
