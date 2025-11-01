import { calculatorRegistry } from '../../data/calculatorRegistry';
import { arm_vs_fixedCalculator } from './arm_vs_fixedCalculator';

export function registerarm_vs_fixedCalculator(): void {
  calculatorRegistry.register(new arm_vs_fixedCalculator());
}
