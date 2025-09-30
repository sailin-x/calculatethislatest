import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerEquityValuationCalculatorCalculator } from './registerEquityValuationCalculatorCalculator';

export function registerregisterEquityValuationCalculatorCalculator(): void {
  calculatorRegistry.register(new registerEquityValuationCalculatorCalculator());
}
