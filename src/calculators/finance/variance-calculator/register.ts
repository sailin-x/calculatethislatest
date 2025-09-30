import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { VarianceCalculator } from './VarianceCalculator';

export function registerVarianceCalculator(): void {
  calculatorRegistry.register(VarianceCalculator);
}

export { VarianceCalculator };
