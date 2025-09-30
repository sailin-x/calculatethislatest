import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ProteinCalculator } from './ProteinCalculator';

export function registerProteinCalculator(): void {
  calculatorRegistry.register(ProteinCalculator);
}

export { ProteinCalculator };
