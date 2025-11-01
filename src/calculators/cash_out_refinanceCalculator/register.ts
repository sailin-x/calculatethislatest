import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cash_out_refinanceCalculator } from './cash_out_refinanceCalculator';

export function registercash_out_refinanceCalculator(): void {
  calculatorRegistry.register(new cash_out_refinanceCalculator());
}
