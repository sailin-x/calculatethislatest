import { calculatorRegistry } from '../../data/calculatorRegistry';
import { retirement_abroad_calculatorCalculatorCalculator } from './retirement_abroad_calculatorCalculatorCalculator';

export function registerretirement_abroad_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new retirement_abroad_calculatorCalculatorCalculator());
}
