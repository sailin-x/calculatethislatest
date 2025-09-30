import { calculatorRegistry } from '../../data/calculatorRegistry';
import { estatePlanningCalculatorCalculator } from './estatePlanningCalculatorCalculator';

export function registerestatePlanningCalculatorCalculator(): void {
  calculatorRegistry.register(new estatePlanningCalculatorCalculator());
}
