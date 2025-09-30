import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { LongTermCareCalculator } from './LongTermCareCalculator';

export function registerLongTermCareCalculator(): void {
  calculatorRegistry.register(LongTermCareCalculator);
}

export { LongTermCareCalculator };
