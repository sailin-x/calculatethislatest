import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_management_calculatorCalculatorCalculator } from './financial_management_calculatorCalculatorCalculator';

export function registerfinancial_management_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_management_calculatorCalculatorCalculator());
}
