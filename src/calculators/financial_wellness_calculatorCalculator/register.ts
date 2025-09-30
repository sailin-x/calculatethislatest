import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_wellness_calculatorCalculatorCalculator } from './financial_wellness_calculatorCalculatorCalculator';

export function registerfinancial_wellness_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_wellness_calculatorCalculatorCalculator());
}
