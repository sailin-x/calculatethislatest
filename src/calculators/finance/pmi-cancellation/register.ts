import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PmiCancellationCalculator } from './PmiCancellationCalculator';

export function registerPmiCancellationCalculator(): void {
  calculatorRegistry.register(PmiCancellationCalculator);
}