import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { GeometryCalculator } from './GeometryCalculator';

export function registerGeometryCalculator(): void {
  calculatorRegistry.register(GeometryCalculator);
}

export { GeometryCalculator };
