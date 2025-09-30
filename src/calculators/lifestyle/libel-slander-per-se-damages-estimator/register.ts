import { calculatorRegistry } from '../../data/calculatorRegistry';
import { libelslanderpersedamagesestimatorCalculator } from './libelslanderpersedamagesestimatorCalculator';

export function registerlibelslanderpersedamagesestimatorCalculator(): void {
  calculatorRegistry.register(new libelslanderpersedamagesestimatorCalculator());
}
