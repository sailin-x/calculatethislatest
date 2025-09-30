import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_sustainability_calculatorCalculatorCalculator } from './financial_sustainability_calculatorCalculatorCalculator';

export function registerfinancial_sustainability_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_sustainability_calculatorCalculatorCalculator());
}
