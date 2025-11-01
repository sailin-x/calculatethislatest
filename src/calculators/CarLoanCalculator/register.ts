import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CarLoanCalculator } from './CarLoanCalculator';

export function registerCarLoanCalculator(): void {
  calculatorRegistry.register(new CarLoanCalculator());
}
