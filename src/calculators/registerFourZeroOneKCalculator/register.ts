import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerFourZeroOneKCalculator } from './registerFourZeroOneKCalculator';

export function registerregisterFourZeroOneKCalculator(): void {
  calculatorRegistry.register(new registerFourZeroOneKCalculator());
}
