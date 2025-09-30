import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { WorkforcePlanningCalculator } from './WorkforcePlanningCalculator';

export function registerWorkforcePlanningCalculator(): void {
  calculatorRegistry.register(WorkforcePlanningCalculator);
}

export { WorkforcePlanningCalculator };
