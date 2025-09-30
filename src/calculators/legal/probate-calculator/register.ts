import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ProbateCalculator } from './ProbateCalculator';

export function registerProbateCalculator(): void {
  calculatorRegistry.register(ProbateCalculator);
}

export { ProbateCalculator };
