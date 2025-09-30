import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { WorkersCompensationCalculator } from './WorkersCompensationCalculator';

export function registerWorkersCompensationCalculator(): void {
  calculatorRegistry.register(WorkersCompensationCalculator);
}

export { WorkersCompensationCalculator };
