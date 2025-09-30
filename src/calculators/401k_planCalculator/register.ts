import { calculatorRegistry } from '../../data/calculatorRegistry';
import { 401k_planCalculatorCalculator } from './401k_planCalculatorCalculator';

export function register401k_planCalculatorCalculator(): void {
  calculatorRegistry.register(new 401k_planCalculatorCalculator());
}
