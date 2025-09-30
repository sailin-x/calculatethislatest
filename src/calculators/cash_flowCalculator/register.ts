import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cash_flowCalculatorCalculator } from './cash_flowCalculatorCalculator';

export function registercash_flowCalculatorCalculator(): void {
  calculatorRegistry.register(new cash_flowCalculatorCalculator());
}
