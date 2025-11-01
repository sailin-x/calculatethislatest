import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { matrixCalculator } from './MatrixCalculator';

export function registerMatrixCalculator() {
  calculatorRegistry.register(MatrixCalculator);
}
