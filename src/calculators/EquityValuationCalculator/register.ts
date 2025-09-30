import { calculatorRegistry } from '../../data/calculatorRegistry';
import { EquityValuationCalculatorCalculator } from './EquityValuationCalculatorCalculator';

export function registerEquityValuationCalculatorCalculator(): void {
  calculatorRegistry.register(new EquityValuationCalculatorCalculator());
}
