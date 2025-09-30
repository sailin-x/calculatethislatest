import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerFAFSACalculatorCalculator } from './registerFAFSACalculatorCalculator';

export function registerregisterFAFSACalculatorCalculator(): void {
  calculatorRegistry.register(new registerFAFSACalculatorCalculator());
}
