import { calculatorRegistry } from '../../data/calculatorRegistry';
import { matrixCalculator } from './matrixCalculator';

export function registermatrixCalculator(): void {
  calculatorRegistry.register(new matrixCalculator());
}
