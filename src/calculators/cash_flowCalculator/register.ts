import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cash_flowCalculator } from './cash_flowCalculator';

export function registercash_flowCalculator(): void {
  calculatorRegistry.register(new cash_flowCalculator());
}
