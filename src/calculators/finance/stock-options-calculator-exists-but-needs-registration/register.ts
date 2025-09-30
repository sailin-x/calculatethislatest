import { calculatorRegistry } from '../../data/calculatorRegistry';
import { stockoptionscalculatorexistsbutneedsregistrationCalculator } from './stockoptionscalculatorexistsbutneedsregistrationCalculator';

export function registerstockoptionscalculatorexistsbutneedsregistrationCalculator(): void {
  calculatorRegistry.register(new stockoptionscalculatorexistsbutneedsregistrationCalculator());
}
