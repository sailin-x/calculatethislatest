import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { fourZeroOneKCalculator } from './FourZeroOneKCalculator';

export function registerFourZeroOneKCalculator(): void {
  calculatorRegistry.register(fourZeroOneKCalculator);
}