import { calculatorRegistry } from '../../data/calculatorRegistry';
import { stock_optionsCalculator } from './stock_optionsCalculator';

export function registerstock_optionsCalculator(): void {
  calculatorRegistry.register(new stock_optionsCalculator());
}
