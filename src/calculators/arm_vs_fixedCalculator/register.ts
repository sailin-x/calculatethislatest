import { calculatorRegistry } from '../../data/calculatorRegistry';
import { arm_vs_fixedCalculatorCalculator } from './arm_vs_fixedCalculatorCalculator';

export function registerarm_vs_fixedCalculatorCalculator(): void {
  calculatorRegistry.register(new arm_vs_fixedCalculatorCalculator());
}
