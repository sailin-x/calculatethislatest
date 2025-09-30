import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { LineOfCreditCalculator } from './LineOfCreditCalculator';

export function registerLineOfCreditCalculator(): void {
  calculatorRegistry.register(LineOfCreditCalculator);
}

export { LineOfCreditCalculator };
