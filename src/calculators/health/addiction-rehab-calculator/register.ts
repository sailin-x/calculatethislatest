import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AddictionRehabCalculator } from './AddictionRehabCalculator';

export function registerAddictionRehabCalculator(): void {
  calculatorRegistry.register(AddictionRehabCalculator);
}

export { AddictionRehabCalculator };
