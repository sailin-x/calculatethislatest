import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AiopsImplementationSavingsCalculator } from './AiopsImplementationSavingsCalculator';

export function registerAiopsImplementationSavingsCalculator(): void {
  calculatorRegistry.register(AiopsImplementationSavingsCalculator);
}

export { AiopsImplementationSavingsCalculator };
