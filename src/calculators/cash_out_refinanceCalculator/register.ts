import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cash_out_refinanceCalculatorCalculator } from './cash_out_refinanceCalculatorCalculator';

export function registercash_out_refinanceCalculatorCalculator(): void {
  calculatorRegistry.register(new cash_out_refinanceCalculatorCalculator());
}
