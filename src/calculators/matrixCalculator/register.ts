import { calculatorRegistry } from '../../data/calculatorRegistry';
import { matrixCalculatorCalculator } from './matrixCalculatorCalculator';

export function registermatrixCalculatorCalculator(): void {
  calculatorRegistry.register(new matrixCalculatorCalculator());
}
