import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MatrixCalculator } from './MatrixCalculator';

export function registerMatrixCalculator() {
  calculatorRegistry.register(MatrixCalculator);
}
