import { calculatorRegistry } from '../../data/calculatorRegistry';
import { arm_mortgageCalculatorCalculator } from './arm_mortgageCalculatorCalculator';

export function registerarm_mortgageCalculatorCalculator(): void {
  calculatorRegistry.register(new arm_mortgageCalculatorCalculator());
}
