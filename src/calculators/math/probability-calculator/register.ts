import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ProbabilityCalculator } from './ProbabilityCalculator';

export function registerProbabilityCalculator(): void {
  calculatorRegistry.register(ProbabilityCalculator);
}

export { ProbabilityCalculator };
