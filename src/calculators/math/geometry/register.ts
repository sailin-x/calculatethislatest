import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { geometryCalculator } from './GeometryCalculator';

export function registerGeometryCalculator() {
  calculatorRegistry.register(GeometryCalculator);
}
