import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AlgebraCalculator } from './AlgebraCalculator';

export function registerAlgebraCalculator(): void {
  calculatorRegistry.register(AlgebraCalculator);
}

export { AlgebraCalculator };
