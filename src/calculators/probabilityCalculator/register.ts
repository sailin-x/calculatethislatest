import { calculatorRegistry } from '../../data/calculatorRegistry';
import { probabilityCalculator } from './probabilityCalculator';

export function registerprobabilityCalculator(): void {
  calculatorRegistry.register(new probabilityCalculator());
}
