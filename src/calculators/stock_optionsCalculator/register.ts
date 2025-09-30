import { calculatorRegistry } from '../../data/calculatorRegistry';
import { stock_optionsCalculatorCalculator } from './stock_optionsCalculatorCalculator';

export function registerstock_optionsCalculatorCalculator(): void {
  calculatorRegistry.register(new stock_optionsCalculatorCalculator());
}
