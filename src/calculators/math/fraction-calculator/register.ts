import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FractionCalculator } from './FractionCalculator';

export function registerFractionCalculator(): void {
  calculatorRegistry.register(FractionCalculator);
}

export { FractionCalculator };
