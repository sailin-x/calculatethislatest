import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cash_on_cash_returnCalculator } from './cash_on_cash_returnCalculator';

export function registercash_on_cash_returnCalculator(): void {
  calculatorRegistry.register(new cash_on_cash_returnCalculator());
}
