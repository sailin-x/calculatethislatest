import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cash_on_cash_returnCalculatorCalculator } from './cash_on_cash_returnCalculatorCalculator';

export function registercash_on_cash_returnCalculatorCalculator(): void {
  calculatorRegistry.register(new cash_on_cash_returnCalculatorCalculator());
}
