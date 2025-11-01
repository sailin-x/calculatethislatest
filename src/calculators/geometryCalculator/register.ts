import { calculatorRegistry } from '../../data/calculatorRegistry';
import { geometryCalculator } from './geometryCalculator';

export function registergeometryCalculator(): void {
  calculatorRegistry.register(new geometryCalculator());
}
