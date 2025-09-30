import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SeoCostCalculator } from './SeoCostCalculator';

export function registerSeoCostCalculator(): void {
  calculatorRegistry.register(SeoCostCalculator);
}

export { SeoCostCalculator };
