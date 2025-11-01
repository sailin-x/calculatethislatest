import { calculatorRegistry } from '../../data/calculatorRegistry';
import { refinanceCalculator } from './refinanceCalculator';

export function registerrefinanceCalculator(): void {
  calculatorRegistry.register(new refinanceCalculator());
}
