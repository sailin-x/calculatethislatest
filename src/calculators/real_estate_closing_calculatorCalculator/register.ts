import { calculatorRegistry } from '../../data/calculatorRegistry';
import { real_estate_closing_calculatorCalculatorCalculator } from './real_estate_closing_calculatorCalculatorCalculator';

export function registerreal_estate_closing_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new real_estate_closing_calculatorCalculatorCalculator());
}
