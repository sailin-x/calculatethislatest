import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { IntermittentFastingCalculator } from './IntermittentFastingCalculator';

export function registerIntermittentFastingCalculator(): void {
  calculatorRegistry.register(IntermittentFastingCalculator);
}

export { IntermittentFastingCalculator };
