import { calculatorRegistry } from '../../data/calculatorRegistry';
import { geometryCalculatorCalculator } from './geometryCalculatorCalculator';

export function registergeometryCalculatorCalculator(): void {
  calculatorRegistry.register(new geometryCalculatorCalculator());
}
