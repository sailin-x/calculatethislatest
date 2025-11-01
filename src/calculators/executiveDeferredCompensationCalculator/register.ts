import { calculatorRegistry } from '../../data/calculatorRegistry';
import { executiveDeferredCompensationCalculator } from './executiveDeferredCompensationCalculator';

export function registerexecutiveDeferredCompensationCalculator(): void {
  calculatorRegistry.register(new executiveDeferredCompensationCalculator());
}
