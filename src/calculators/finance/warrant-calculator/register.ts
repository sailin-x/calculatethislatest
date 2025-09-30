import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { WarrantCalculator } from './WarrantCalculator';

export function registerWarrantCalculator(): void {
  calculatorRegistry.register(WarrantCalculator);
}

export { WarrantCalculator };
