import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_rate_lockCalculator } from './mortgage_rate_lockCalculator';

export function registermortgage_rate_lockCalculator(): void {
  calculatorRegistry.register(new mortgage_rate_lockCalculator());
}
