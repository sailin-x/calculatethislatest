import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CybersecurityCalculator } from './CybersecurityCalculator';

export function registerCybersecurityCalculator(): void {
  calculatorRegistry.register(CybersecurityCalculator);
}

export { CybersecurityCalculator };
