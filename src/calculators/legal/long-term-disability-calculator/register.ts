import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { LongTermDisabilityCalculator } from './LongTermDisabilityCalculator';

export function registerLongTermDisabilityCalculator(): void {
  calculatorRegistry.register(LongTermDisabilityCalculator);
}

export { LongTermDisabilityCalculator };
