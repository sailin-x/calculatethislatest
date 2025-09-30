import { calculatorRegistry } from '../../data/calculatorRegistry';
import { operating_margin_calculatorCalculatorCalculator } from './operating_margin_calculatorCalculatorCalculator';

export function registeroperating_margin_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new operating_margin_calculatorCalculatorCalculator());
}
