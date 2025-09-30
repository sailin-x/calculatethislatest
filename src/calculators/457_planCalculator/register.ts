import { calculatorRegistry } from '../../data/calculatorRegistry';
import { 457_planCalculatorCalculator } from './457_planCalculatorCalculator';

export function register457_planCalculatorCalculator(): void {
  calculatorRegistry.register(new 457_planCalculatorCalculator());
}
