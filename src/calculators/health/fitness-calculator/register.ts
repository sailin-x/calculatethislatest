import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FitnessCalculator } from './FitnessCalculator';

export function registerFitnessCalculator(): void {
  calculatorRegistry.register(FitnessCalculator);
}

export { FitnessCalculator };
