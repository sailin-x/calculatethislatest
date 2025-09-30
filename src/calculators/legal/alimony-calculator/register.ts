import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AlimonyCalculator } from './AlimonyCalculator';

export function registerAlimonyCalculator(): void {
  calculatorRegistry.register(AlimonyCalculator);
}

export { AlimonyCalculator };
