import { calculatorRegistry } from '../../data/calculatorRegistry';
import { retirement_savings_calculatorCalculatorCalculator } from './retirement_savings_calculatorCalculatorCalculator';

export function registerretirement_savings_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new retirement_savings_calculatorCalculatorCalculator());
}
