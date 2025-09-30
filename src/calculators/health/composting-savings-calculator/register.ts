import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CompostingSavingsCalculator } from './CompostingSavingsCalculator';

export function registerCompostingSavingsCalculator(): void {
  calculatorRegistry.register(CompostingSavingsCalculator);
}

export { CompostingSavingsCalculator };
