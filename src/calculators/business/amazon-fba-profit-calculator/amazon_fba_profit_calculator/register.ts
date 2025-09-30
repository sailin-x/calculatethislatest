import { calculatorRegistry } from '../../data/calculatorRegistry';
import { amazon_fba_profit_calculatorCalculator } from './amazon_fba_profit_calculatorCalculator';

export function registeramazon_fba_profit_calculatorCalculator(): void {
  calculatorRegistry.register(new amazon_fba_profit_calculatorCalculator());
}
