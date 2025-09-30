import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { EpaFineCalculator } from './EpaFineCalculator';

export function registerEpaFineCalculator(): void {
  calculatorRegistry.register(EpaFineCalculator);
}

export { EpaFineCalculator };
