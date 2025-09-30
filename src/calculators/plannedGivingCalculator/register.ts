import { calculatorRegistry } from '../../data/calculatorRegistry';
import { plannedGivingCalculatorCalculator } from './plannedGivingCalculatorCalculator';

export function registerplannedGivingCalculatorCalculator(): void {
  calculatorRegistry.register(new plannedGivingCalculatorCalculator());
}
