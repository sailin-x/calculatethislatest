import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MachineLearningCalculator } from './MachineLearningCalculator';

export function registerMachineLearningCalculator(): void {
  calculatorRegistry.register(MachineLearningCalculator);
}

export { MachineLearningCalculator };
