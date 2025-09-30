import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_freedom_calculatorCalculatorCalculator } from './financial_freedom_calculatorCalculatorCalculator';

export function registerfinancial_freedom_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_freedom_calculatorCalculatorCalculator());
}
