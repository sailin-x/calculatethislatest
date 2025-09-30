import { calculatorRegistry } from '../../data/calculatorRegistry';
import { 529_college_savings_planCalculatorCalculator } from './529_college_savings_planCalculatorCalculator';

export function register529_college_savings_planCalculatorCalculator(): void {
  calculatorRegistry.register(new 529_college_savings_planCalculatorCalculator());
}
