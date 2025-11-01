import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerFAFSACalculator } from './registerFAFSACalculator';

export function registerregisterFAFSACalculator(): void {
  calculatorRegistry.register(new registerFAFSACalculator());
}
