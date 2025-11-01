import { calculatorRegistry } from '../../data/calculatorRegistry';
import { estatePlanningCalculator } from './estatePlanningCalculator';

export function registerestatePlanningCalculator(): void {
  calculatorRegistry.register(new estatePlanningCalculator());
}
