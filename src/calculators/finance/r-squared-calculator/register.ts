import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { RSquaredCalculator } from './RSquaredCalculator';

export function registerRSquaredCalculator(): void {
  calculatorRegistry.register(RSquaredCalculator);
}

export { RSquaredCalculator };
