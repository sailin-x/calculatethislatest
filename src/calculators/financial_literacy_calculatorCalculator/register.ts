import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_literacy_calculatorCalculatorCalculator } from './financial_literacy_calculatorCalculatorCalculator';

export function registerfinancial_literacy_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_literacy_calculatorCalculatorCalculator());
}
