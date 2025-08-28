import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { GeometryCalculator } from './GeometryCalculator';

export function registerGeometryCalculator() {
  calculatorRegistry.register(GeometryCalculator);
}
