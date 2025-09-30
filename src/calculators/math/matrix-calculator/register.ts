import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MatrixCalculator } from './MatrixCalculator';

export function registerMatrixCalculator(): void {
  calculatorRegistry.register(MatrixCalculator);
}

export { MatrixCalculator };
