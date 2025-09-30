import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CarLoanCalculatorCalculator } from './CarLoanCalculatorCalculator';

export function registerCarLoanCalculatorCalculator(): void {
  calculatorRegistry.register(new CarLoanCalculatorCalculator());
}
