import { calculatorRegistry } from '../../data/calculatorRegistry';
import { home_affordabilityCalculatorCalculator } from './home_affordabilityCalculatorCalculator';

export function registerhome_affordabilityCalculatorCalculator(): void {
  calculatorRegistry.register(new home_affordabilityCalculatorCalculator());
}
