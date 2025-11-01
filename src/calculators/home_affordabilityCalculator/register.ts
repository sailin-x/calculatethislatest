import { calculatorRegistry } from '../../data/calculatorRegistry';
import { home_affordabilityCalculator } from './home_affordabilityCalculator';

export function registerhome_affordabilityCalculator(): void {
  calculatorRegistry.register(new home_affordabilityCalculator());
}
