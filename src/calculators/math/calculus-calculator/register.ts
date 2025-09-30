import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CalculusCalculator } from './CalculusCalculator';

export function registerCalculusCalculator(): void {
  calculatorRegistry.register(CalculusCalculator);
}

export { CalculusCalculator };
