import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerPlannedGivingCalculatorCalculator } from './registerPlannedGivingCalculatorCalculator';

export function registerregisterPlannedGivingCalculatorCalculator(): void {
  calculatorRegistry.register(new registerPlannedGivingCalculatorCalculator());
}
