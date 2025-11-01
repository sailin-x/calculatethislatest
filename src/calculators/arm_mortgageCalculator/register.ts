import { calculatorRegistry } from '../../data/calculatorRegistry';
import { arm_mortgageCalculator } from './arm_mortgageCalculator';

export function registerarm_mortgageCalculator(): void {
  calculatorRegistry.register(new arm_mortgageCalculator());
}
